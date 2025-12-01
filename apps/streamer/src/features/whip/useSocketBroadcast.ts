import {RefObject, useCallback, useEffect, useRef, useState} from 'react';
import {io, Socket} from 'socket.io-client';

const SOCKET_URL = "ws://localhost:47284";
const DEEPLINK_URL = "pang-streamer-app://start";

const getDownloadUrl = (): string => {
	const platform = navigator.platform.toLowerCase();
	const userAgent = navigator.userAgent.toLowerCase();

	if (platform.includes('mac') || userAgent.includes('mac')) {
		return 'https://github.com/pang-streaming/pang-streaming-app/releases/download/v1.0.0/Pang.Streaming.App-1.0.0-arm64.pkg';
	} else {
		return 'https://github.com/pang-streaming/pang-streaming-app/releases/download/v1.0.0/Pang.Streaming.App.Setup.1.0.0.exe';
	}
};

export const useSocketBroadcast = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	streamKey?: string | null,
	rtmpUrls?: string[],
	mixedAudioTrack?: MediaStreamTrack | null,
	resumeAudioContext?: () => Promise<boolean>,
) => {
	const socketRef = useRef<Socket | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const isStreaming = useRef<boolean>(false);
	const chunkCountRef = useRef<number>(0);
	const hasTriedDeeplink = useRef<boolean>(false);

	const [isConnected, setIsConnected] = useState(false);
	const [showDownloadModal, setShowDownloadModal] = useState(false);

	// 딥링크 시도 후 연결 확인
	const tryDeeplinkAndConnect = useCallback(() => {
		if (hasTriedDeeplink.current) {
			// 이미 딥링크 시도했는데도 연결 안되면 모달 표시
			setShowDownloadModal(true);
			return;
		}

		hasTriedDeeplink.current = true;

		// 딥링크로 앱 열기 시도
		window.location.href = DEEPLINK_URL;

		// 3초 후에도 연결 안되면 모달 표시
		setTimeout(() => {
			if (!socketRef.current?.connected) {
				setShowDownloadModal(true);
			}
		}, 3000);
	}, []);

	// 앱 다운로드
	const downloadApp = useCallback(() => {
		const downloadUrl = getDownloadUrl();
		window.location.href = downloadUrl;
		setShowDownloadModal(false);
	}, []);

	// 모달 닫기
	const closeDownloadModal = useCallback(() => {
		setShowDownloadModal(false);
	}, []);

	useEffect(() => {
		socketRef.current = io(SOCKET_URL, {
			transports: ["websocket"],
			timeout: 3000,
		});

		socketRef.current.on('connect', () => {
			console.log('Socket.IO connected to local agent');
			setIsConnected(true);
			hasTriedDeeplink.current = false;
		});

		socketRef.current.on('connect_error', () => {
			setIsConnected(false);
			tryDeeplinkAndConnect();
		});

		socketRef.current.on('disconnect', () => {
			console.log('Socket.IO disconnected from local agent');
			setIsConnected(false);
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
	}, [tryDeeplinkAndConnect]);

	const stopStreaming = useCallback(() => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
			mediaRecorderRef.current.stop();
		}

		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop());
		}

		socketRef.current?.emit('stop-stream');

		isStreaming.current = false;
		chunkCountRef.current = 0;
	}, []);

	const startStreaming = useCallback(async () => {
		// 사용자 상호작용(버튼 클릭) 컨텍스트에서 AudioContext resume
		if (resumeAudioContext) {
			await resumeAudioContext();
		}

		if (!canvasRef.current) {
			throw new Error('Canvas reference is missing');
		}

		if (!streamKey) {
			throw new Error('Stream key is missing');
		}

		if (!socketRef.current?.connected) {
			// 연결 안되어 있으면 딥링크 시도
			tryDeeplinkAndConnect();
			throw new Error('Socket not connected to local agent');
		}

		try {
			const canvas = canvasRef.current;

			// Canvas 스트림 60fps
			const stream = canvas.captureStream(60);
			streamRef.current = stream;

			// 믹싱된 오디오 트랙 추가 (마이크 + 화면공유 오디오 등)
			const hasAudio = mixedAudioTrack && mixedAudioTrack.readyState === 'live';

			if (hasAudio) {
				stream.addTrack(mixedAudioTrack);
			}

			// MediaRecorder 설정 - 오디오 유무에 따라 코덱 선택
			const options: MediaRecorderOptions = {
				videoBitsPerSecond: 4500000,
				audioBitsPerSecond: 128000
			};

			// 오디오가 있으면 opus 포함, 없으면 비디오만
			if (hasAudio) {
				options.mimeType = 'video/webm;codecs=h264,opus';
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					options.mimeType = 'video/webm;codecs=vp8,opus';

					if (!MediaRecorder.isTypeSupported(options.mimeType)) {
						options.mimeType = 'video/webm';
					}
				}
			} else {
				options.mimeType = 'video/webm;codecs=h264';
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					options.mimeType = 'video/webm;codecs=vp8';

					if (!MediaRecorder.isTypeSupported(options.mimeType)) {
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

						socketRef.current?.emit('video-chunk-webm', {
							buffer: buffer,
							timestamp: Date.now()
						});
					}).catch(err => {
						console.error('Error converting chunk to ArrayBuffer:', err);
					});
				}
			};

			mediaRecorder.onerror = () => {
				stopStreaming();
			};

			// RTMP URLs 필터링 (빈 값 제외)
			const userRtmpUrls = (rtmpUrls || []).filter(url => url && url.trim() !== '');

			// 내부 서버 URL을 첫번째로 추가
			const validRtmpUrls = [`rtmp://43.202.111.208:1935/${streamKey}`, ...userRtmpUrls];

			// Socket.IO로 로컬 에이전트에 스트리밍 시작 알림
			socketRef.current.emit('start-stream-webm', {
				rtmpUrl: validRtmpUrls.length === 1 ? validRtmpUrls[0] : validRtmpUrls,
				mimeType: options.mimeType,
				fps: 60,
				keyframeInterval: 2
			});

			// MediaRecorder 시작
			mediaRecorder.start(33);
			chunkCountRef.current = 0;

			isStreaming.current = true;
		} catch (error) {
			console.error('Failed to start streaming:', error);
			throw error;
		}
	}, [canvasRef, streamKey, rtmpUrls, mixedAudioTrack, resumeAudioContext, tryDeeplinkAndConnect, stopStreaming]);

	return {
		isStreaming,
		isConnected,
		startStreaming,
		stopStreaming,
		showDownloadModal,
		closeDownloadModal,
		downloadApp,
	};
};
