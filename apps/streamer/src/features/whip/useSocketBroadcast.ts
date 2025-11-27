import {RefObject, useCallback, useEffect, useRef} from 'react';
import {io, Socket} from 'socket.io-client';
import {api} from "@pang/shared/ui";

const SOCKET_URL = "ws://localhost:47284";

export const useSocketBroadcast = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	streamKey?: string | null,
	rtmpUrls?: string[],
) => {
	const socketRef = useRef<Socket | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const isStreaming = useRef<boolean>(false);
	const chunkCountRef = useRef<number>(0);
	
	useEffect(() => {
		socketRef.current = io(SOCKET_URL, {
			transports: ["websocket"],
			timeout: 3000
		});
		
		socketRef.current.on('connect', () => {
			console.log('Socket.IO connected to local agent');
		});
		
		socketRef.current.on('connect_error', (error) => {
			console.log('Socket connection failed, opening deeplink to start app');
			console.error('Connection error:', error);
			
			window.location.href = 'pang-streamer://start';
			
			// setTimeout(() => {
			// 	window.location.href = import.meta.env.VITE_STREAMER_DOWNLOAD_URL || 'https://github.com/your-org/pang-streamer/releases/latest';
			// }, 2000);
		});
		
		socketRef.current.on('disconnect', () => {
			console.log('Socket.IO disconnected from local agent');
			if (isStreaming.current) {
				stopStreaming();
			}
		});
		
		socketRef.current.on('stream-ready', () => {
			console.log('Stream ready from local agent');
		});
		
		socketRef.current.on('stream-error', (data) => {
			console.error('Stream error from local agent:', data);
			if (isStreaming.current) {
				stopStreaming();
			}
		});
		
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);
	
	const createStream = async (): Promise<null> => {
		const res = await api.post(`/stream`, {}, {
			headers: {
				"X-Stream-Key": streamKey,
			}
		});
		return res.data.data || [];
	};
	
	const startStreaming = useCallback(async () => {
		if (!canvasRef.current) {
			throw new Error('Canvas reference is missing');
		}
		
		if (!streamKey) {
			throw new Error('Stream key is missing');
		}
		
		if (!socketRef.current?.connected) {
			throw new Error('Socket not connected to local agent');
		}
		
		try {
			const canvas = canvasRef.current;
			
			// Canvas 스트림 60fps
			const stream = canvas.captureStream(60);
			streamRef.current = stream;
			
			// 마이크 오디오 캡처 (선택적)
			try {
				const audioStream = await navigator.mediaDevices.getUserMedia({
					audio: {
						echoCancellation: true,
						noiseSuppression: true,
						autoGainControl: true,
						sampleRate: 48000
					}
				});
				
				const audioTrack = audioStream.getAudioTracks()[0];
				if (audioTrack) {
					stream.addTrack(audioTrack);
					console.log('Microphone audio track added:', audioTrack.label);
				}
			} catch (err) {
				console.warn('마이크 접근 실패:', err);
			}
			
			// MediaRecorder 설정 - H.264 우선 사용
			const options: MediaRecorderOptions = {
				mimeType: 'video/webm;codecs=h264,opus',
				videoBitsPerSecond: 4500000,
				audioBitsPerSecond: 128000
			};
			
			if (!MediaRecorder.isTypeSupported(<string>options.mimeType)) {
				console.log('H.264+Opus not supported, trying VP8+Opus');
				options.mimeType = 'video/webm;codecs=vp8,opus';
				
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					console.log('VP8+Opus not supported, trying VP8');
					options.mimeType = 'video/webm;codecs=vp8';
					
					if (!MediaRecorder.isTypeSupported(options.mimeType)) {
						console.log('VP8 not supported, using default');
						options.mimeType = 'video/webm';
					}
				}
			}
			
			const mediaRecorder = new MediaRecorder(stream, options);
			mediaRecorderRef.current = mediaRecorder;
			
			mediaRecorder.ondataavailable = (event) => {
				if (event.data && event.data.size > 0) {
					event.data.arrayBuffer().then(buffer => {
						chunkCountRef.current++;
						
						if (chunkCountRef.current <= 5) {
							console.log(`Sending chunk ${chunkCountRef.current}: ${event.data.size} bytes`);
						}
						
						socketRef.current?.emit('video-chunk-webm', {
							buffer: buffer,
							timestamp: Date.now()
						});
					}).catch(err => {
						console.error('Error converting chunk to ArrayBuffer:', err);
					});
				}
			};
			
			mediaRecorder.onerror = (error) => {
				console.error('MediaRecorder error:', error);
				stopStreaming();
			};
			
			mediaRecorder.onstart = () => {
				console.log('MediaRecorder started:', options.mimeType);
			};
			
			// 서버에 스트림 생성 API 호출
			await createStream();
			
			// RTMP URLs 필터링 (빈 값 제외)
			const userRtmpUrls = (rtmpUrls || []).filter(url => url && url.trim() !== '');
			
			// 내부 서버 URL을 첫번째로 추가
			const validRtmpUrls = ["rtmp://43.202.111.208:1935/dde0fbf7e26cffe9d441cd8f5508a7f1", ...userRtmpUrls];
			
			// Socket.IO로 로컬 에이전트에 스트리밍 시작 알림
			socketRef.current.emit('start-stream-webm', {
				rtmpUrl: validRtmpUrls.length === 1 ? validRtmpUrls[0] : validRtmpUrls,
				mimeType: options.mimeType,
				fps: 60,
				// 키프레임 간격 힌트 (실제로는 브라우저가 결정하지만 로컬 에이전트에 전달)
				keyframeInterval: 2 // 목표: 2초
			});
			
			// MediaRecorder 시작
			// 더 짧은 타임슬라이스로 키프레임 생성 빈도 향상 시도 (33ms = ~30fps)
			// 하지만 실제 키프레임 간격은 브라우저가 결정
			mediaRecorder.start(33);
			chunkCountRef.current = 0;
			
			console.log('Streaming started with Socket.IO (timeslice: 33ms)');
			console.log('⚠️ Browser controls keyframe interval - if GOP > 4s, consider using OBS with RTMP');
			isStreaming.current = true;
		} catch (error) {
			console.error('Failed to start streaming:', error);
			throw error;
		}
	}, [canvasRef, streamKey, rtmpUrls]);
	
	const stopStreaming = useCallback(async () => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
			mediaRecorderRef.current.stop();
		}
		
		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop());
		}
		
		socketRef.current?.emit('stop-stream');
		
		try {
			await api.delete("/stream", {
				headers: {
					"X-Stream-Key": streamKey
				}
			});
		} catch (err) {
			console.error('Failed to delete stream:', err);
		}
		
		isStreaming.current = false;
		chunkCountRef.current = 0;
		console.log('Streaming stopped');
	}, [streamKey]);
	
	return { isStreaming, startStreaming, stopStreaming };
};
