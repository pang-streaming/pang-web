import {RefObject, useCallback, useEffect, useRef} from 'react';
import {io, Socket} from 'socket.io-client';
import {api} from "@pang/shared/ui";

const SOCKET_URL = "wss://localhost:47284";

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
	
	useEffect(() => {
		socketRef.current = io(SOCKET_URL, {
			transports: ["websocket"],
			timeout: 3000,
			secure: true,
		});
		
		socketRef.current.on('connect', () => {
			console.log('Socket.IO connected to local agent');
		});
		
		socketRef.current.on('connect_error', (error) => {
			console.log('Socket connection failed, opening deeplink to start app');
			console.error('Connection error:', error);
			
			// window.location.href = 'pang-streamer://start';
			
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
		console.log('[STREAM DEBUG] ========== startStreaming called ==========');

		// 사용자 상호작용(버튼 클릭) 컨텍스트에서 AudioContext resume
		if (resumeAudioContext) {
			console.log('[STREAM DEBUG] Resuming AudioContext...');
			const resumed = await resumeAudioContext();
			console.log('[STREAM DEBUG] AudioContext resume result:', resumed);
		}

		console.log('[STREAM DEBUG] mixedAudioTrack:', {
			exists: !!mixedAudioTrack,
			id: mixedAudioTrack?.id,
			kind: mixedAudioTrack?.kind,
			label: mixedAudioTrack?.label,
			enabled: mixedAudioTrack?.enabled,
			muted: mixedAudioTrack?.muted,
			readyState: mixedAudioTrack?.readyState,
		});

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
			console.log('[STREAM DEBUG] Canvas:', {
				width: canvas.width,
				height: canvas.height,
			});

			// Canvas 스트림 60fps
			const stream = canvas.captureStream(60);
			streamRef.current = stream;

			console.log('[STREAM DEBUG] Canvas stream created:', {
				id: stream.id,
				active: stream.active,
				videoTracks: stream.getVideoTracks().map(t => ({
					id: t.id,
					enabled: t.enabled,
					readyState: t.readyState,
					label: t.label,
				})),
				audioTracks: stream.getAudioTracks().map(t => ({
					id: t.id,
					enabled: t.enabled,
					readyState: t.readyState,
					label: t.label,
				})),
			});

			// 믹싱된 오디오 트랙 추가 (마이크 + 화면공유 오디오 등)
			const hasAudio = mixedAudioTrack && mixedAudioTrack.readyState === 'live';
			console.log('[STREAM DEBUG] hasAudio:', hasAudio);

			if (hasAudio) {
				stream.addTrack(mixedAudioTrack);
				console.log('[STREAM DEBUG] Mixed audio track added:', {
					id: mixedAudioTrack.id,
					enabled: mixedAudioTrack.enabled,
					readyState: mixedAudioTrack.readyState
				});
			} else {
				console.warn('[STREAM DEBUG] 믹싱된 오디오 트랙이 없거나 유효하지 않음:', {
					exists: !!mixedAudioTrack,
					readyState: mixedAudioTrack?.readyState,
				});
			}

			// 스트림 최종 상태 확인
			console.log('[STREAM DEBUG] Final stream state:', {
				id: stream.id,
				active: stream.active,
				videoTrackCount: stream.getVideoTracks().length,
				audioTrackCount: stream.getAudioTracks().length,
				allTracks: stream.getTracks().map(t => ({
					kind: t.kind,
					id: t.id,
					enabled: t.enabled,
					readyState: t.readyState,
				})),
			});

			// MediaRecorder 설정 - 오디오 유무에 따라 코덱 선택
			const options: MediaRecorderOptions = {
				videoBitsPerSecond: 4500000,
				audioBitsPerSecond: 128000
			};

			// 지원되는 코덱 확인
			console.log('[STREAM DEBUG] Codec support check:', {
				'video/webm;codecs=h264,opus': MediaRecorder.isTypeSupported('video/webm;codecs=h264,opus'),
				'video/webm;codecs=vp8,opus': MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus'),
				'video/webm;codecs=h264': MediaRecorder.isTypeSupported('video/webm;codecs=h264'),
				'video/webm;codecs=vp8': MediaRecorder.isTypeSupported('video/webm;codecs=vp8'),
				'video/webm': MediaRecorder.isTypeSupported('video/webm'),
			});

			// 오디오가 있으면 opus 포함, 없으면 비디오만
			if (hasAudio) {
				options.mimeType = 'video/webm;codecs=h264,opus';
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					console.log('[STREAM DEBUG] H.264+Opus not supported, trying VP8+Opus');
					options.mimeType = 'video/webm;codecs=vp8,opus';

					if (!MediaRecorder.isTypeSupported(options.mimeType)) {
						console.log('[STREAM DEBUG] VP8+Opus not supported, using default webm');
						options.mimeType = 'video/webm';
					}
				}
			} else {
				// 오디오 없을 때는 비디오 코덱만
				options.mimeType = 'video/webm;codecs=h264';
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					console.log('[STREAM DEBUG] H.264 not supported, trying VP8');
					options.mimeType = 'video/webm;codecs=vp8';

					if (!MediaRecorder.isTypeSupported(options.mimeType)) {
						console.log('[STREAM DEBUG] VP8 not supported, using default webm');
						options.mimeType = 'video/webm';
					}
				}
			}

			console.log('[STREAM DEBUG] Final MediaRecorder options:', options);

			let mediaRecorder: MediaRecorder;
			try {
				mediaRecorder = new MediaRecorder(stream, options);
				console.log('[STREAM DEBUG] MediaRecorder created successfully:', {
					state: mediaRecorder.state,
					mimeType: mediaRecorder.mimeType,
					videoBitsPerSecond: mediaRecorder.videoBitsPerSecond,
					audioBitsPerSecond: mediaRecorder.audioBitsPerSecond,
				});
			} catch (recorderError) {
				console.error('[STREAM DEBUG] MediaRecorder creation failed:', recorderError);
				throw recorderError;
			}
			mediaRecorderRef.current = mediaRecorder;

			mediaRecorder.ondataavailable = (event) => {
				if (event.data && event.data.size > 0) {
					event.data.arrayBuffer().then(buffer => {
						chunkCountRef.current++;

						if (chunkCountRef.current <= 5) {
							console.log(`[STREAM DEBUG] Chunk ${chunkCountRef.current}: ${event.data.size} bytes, type: ${event.data.type}`);
						}

						socketRef.current?.emit('video-chunk-webm', {
							buffer: buffer,
							timestamp: Date.now()
						});
					}).catch(err => {
						console.error('[STREAM DEBUG] Error converting chunk to ArrayBuffer:', err);
					});
				}
			};

			mediaRecorder.onerror = (event) => {
				const error = (event as ErrorEvent).error || event;
				console.error('[STREAM DEBUG] MediaRecorder error event:', {
					type: event.type,
					error: error,
					message: error?.message,
					name: error?.name,
					recorderState: mediaRecorder.state,
				});
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
	}, [canvasRef, streamKey, rtmpUrls, mixedAudioTrack, resumeAudioContext]);
	
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
