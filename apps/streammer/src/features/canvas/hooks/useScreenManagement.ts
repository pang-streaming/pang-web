import React, {useCallback, useEffect, useState} from "react";
import {CanvasSize, Screen} from "@/features/canvas/constants/canvas-constants";
import {useAudioStore} from "@/features/audio/stores/useAudioStore";

interface ScreenManagement {
	screens: Screen[];
	setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
	addVideoScreen: () => Promise<void>;
	clearScreens: () => void;
}

export const useScreenManagement = (
	canvasSize: CanvasSize
): ScreenManagement => {
	const { addAudioTrack, removeAudioTrack, clearAllAudioTracks } = useAudioStore();
	const [screens, setScreens] = useState<Screen[]>([]);
	
	// Keep screens within bounds on resize
	useEffect(() => {
		setScreens(prev => prev.map(s => ({
			...s,
			x: Math.min(s.x, canvasSize.width - s.width),
			y: Math.min(s.y, canvasSize.height - s.height)
		})));
	}, [canvasSize]);
	
	const addVideoScreen = useCallback(async (): Promise<void> => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: {
					width: { ideal: 1920, max: 3840 },
					height: { ideal: 1080, max: 2160 },
					frameRate: { ideal: 30, max: 120 },
				},
				audio: true
			});
			const audioTrack = stream.getAudioTracks()[0];
			console.log('screen share audio track: ', audioTrack ? {
				id: audioTrack.id,
				label: audioTrack.label,
				enabled: audioTrack.enabled,
				readyState: audioTrack.readyState
			}: 'No audio track')
			if (audioTrack) {
				addAudioTrack(audioTrack, 'screen', 'Screen Audio');
			}
			
			const video = document.createElement("video");
			video.srcObject = stream;
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			
			await new Promise<void>((resolve) => {
				video.onloadedmetadata = () => {
					video.play()
						.then(() => resolve())
						.catch(err => {
							console.error("재생 실패:", err);
							resolve();
						});
				};
			});
			
			const videoAspectRatio = video.videoWidth / video.videoHeight;
			const width = Math.min(640, canvasSize.width * 0.4);
			const height = width / videoAspectRatio;
			const x = Math.random() * (canvasSize.width - width);
			const y = Math.random() * (canvasSize.height - height);
			
			const screenObj: Screen = {
				id: Date.now(),
				type: 'video',
				source: video,
				stream: stream,
				// ...(audioNodes || {}),
				x: x,
				y: y,
				width: width,
				height: height
			};
			
			setScreens(prev => [...prev, screenObj]);
			
			stream.getVideoTracks()[0].addEventListener('ended', () => {
				setScreens(prev => {
					const screen = prev.find(s => s.stream === stream);
					if (screen) {
						screen.audioSource?.disconnect();
						screen.gainNode?.disconnect();
					}
					const audioTrack = stream.getAudioTracks()[0];
					if (audioTrack) {
						removeAudioTrack(audioTrack.id);
					}
					return prev.filter(s => s.stream !== stream);
				});
			});
			
		} catch (err) {
			const error = err as Error & { name?: string };
			console.error("화면 공유 실패:", err);
			if (error.name === 'NotAllowedError') {
				alert("화면 공유 권한이 거부되었습니다.");
			} else {
				alert("화면 공유에 실패했습니다: " + error.message);
			}
		}
	}, [canvasSize.height, canvasSize.width, addAudioTrack, removeAudioTrack]);
	
	const clearScreens = useCallback((): void => {
		clearAllAudioTracks();
		setScreens(prev => {
			prev.forEach(s => {
				s.stream?.getTracks().forEach(track => track.stop());
				s.audioSource?.disconnect();
				s.gainNode?.disconnect();
			});
			return [];
		});
	}, [clearAllAudioTracks]);
	
	return {
		screens,
		setScreens,
		addVideoScreen,
		clearScreens
	};
};