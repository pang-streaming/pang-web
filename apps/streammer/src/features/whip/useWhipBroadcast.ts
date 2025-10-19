import {RefObject, useCallback, useEffect, useRef, useState} from 'react';

export interface WhipBroadcastConfig {
  whipUrl: string;
  bitrate?: number;
  fps?: number;
  bearerToken?: string;
}

interface WhipBroadcastStatus {
  isStreaming: boolean;
  connectionState: string;
  iceState: string;
  error?: string;
  fps: number;
  frameCount: number;
}

export const useWhipBroadcast = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	config: WhipBroadcastConfig,
	audios: MediaStreamTrack[]
) => {
  const [status, setStatus] = useState<WhipBroadcastStatus>({
    isStreaming: false,
    connectionState: 'disconnected',
    iceState: 'disconnected',
    fps: 0,
    frameCount: 0,
  });

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const lastFrameTime = useRef<number>(0);
  const frameCounter = useRef<number>(0);

  // FPS 계산을 위한 함수
  const updateFps = useCallback(() => {
    const now = performance.now();
    const delta = now - lastFrameTime.current;
    if (delta >= 1000) {
      setStatus(prev => ({
        ...prev,
        fps: Math.round((frameCounter.current * 1000) / delta),
        frameCount: frameCounter.current,
      }));
      frameCounter.current = 0;
      lastFrameTime.current = now;
    }
    frameCounter.current++;
  }, []);

  // SDP에서 H.264와 Opus 코덱만 사용하도록 설정
  const setCodecPreferences = useCallback((sdp: string): string => {
    const lines = sdp.split('\r\n');
    const h264Payloads: string[] = [];
    const opusPayloads: string[] = [];
    const payloadsToKeep: string[] = [];
    const rtxMap = new Map<string, string>(); // rtx -> main

    // 1. Find H264 and Opus payloads, and build RTX map
    lines.forEach(line => {
      const rtpmapMatch = line.match(/^a=rtpmap:(\d+)\s+(.+)/);
      if (rtpmapMatch) {
        const payload = rtpmapMatch[1];
        const codec = rtpmapMatch[2].toLowerCase();
        if (codec.includes('h264')) {
          h264Payloads.push(payload);
        } else if (codec.includes('opus')) {
          opusPayloads.push(payload);
        }
      }
      const fmtpMatch = line.match(/^a=fmtp:(\d+)\s+apt=(\d+)/);
      if (fmtpMatch) {
        rtxMap.set(fmtpMatch[1], fmtpMatch[2]);
      }
    });

    payloadsToKeep.push(...h264Payloads, ...opusPayloads);

    // 2. Find associated RTX payloads to keep
    rtxMap.forEach((mainPayload, rtxPayload) => {
      if (h264Payloads.includes(mainPayload) || opusPayloads.includes(mainPayload)) {
        payloadsToKeep.push(rtxPayload);
      }
    });

    // 3. Filter all lines that don't belong to a payload we want to keep
    const filteredLines = lines.filter(line => {
      if (!line.startsWith('a=')) {
        return true; // Keep non 'a=' lines (like m=, c=, etc.)
      }
      const match = line.match(/^a=(rtpmap|fmtp|rtcp-fb):(\d+)/);
      if (match) {
        return payloadsToKeep.includes(match[2]);
      }
      // Keep other a= lines that are not payload-specific
      return !line.match(/^a=(rtpmap|fmtp|rtcp-fb):/);
    });

    // 4. Reconstruct m-lines
    const finalLines = filteredLines.map(line => {
      if (line.startsWith('m=video')) {
        const parts = line.split(' ');
        const mediaInfo = parts.slice(0, 3);
        const originalPayloads = parts.slice(3);
        const keptPayloads = originalPayloads.filter(p => payloadsToKeep.includes(p));

        // Prioritize H.264
        const finalPayloads = [
          ...h264Payloads,
          ...keptPayloads.filter(p => !h264Payloads.includes(p)),
        ];
        return `${mediaInfo.join(' ')} ${[...new Set(finalPayloads)].join(' ')}`;
      }
      if (line.startsWith('m=audio')) {
        const parts = line.split(' ');
        const mediaInfo = parts.slice(0, 3);
        const originalPayloads = parts.slice(3);
        const keptPayloads = originalPayloads.filter(p => payloadsToKeep.includes(p));

        // Prioritize Opus
        const finalPayloads = [
          ...opusPayloads,
          ...keptPayloads.filter(p => !opusPayloads.includes(p)),
        ];
        return `${mediaInfo.join(' ')} ${[...new Set(finalPayloads)].join(' ')}`;
      }
      return line;
    });

    return finalLines.join('\r\n');
  }, []);

  const startStreaming = useCallback(async () => {
    if (!canvasRef.current || !config.whipUrl) {
      throw new Error('Canvas reference or WHIP URL is missing');
    }

    try {
      const stream = canvasRef.current.captureStream(config.fps || 60);
      mediaStream.current = stream;
			
			if (audios.length > 0) {
				const audioContext = new AudioContext();
				const destination = audioContext.createMediaStreamDestination();
				audios.forEach(track => {
					const source = audioContext.createMediaStreamSource(new MediaStream([track]));
					source.connect(destination);
				})
				const mixedAudioTrack = destination.stream.getAudioTracks()[0];
				stream.addTrack(mixedAudioTrack);
			} else {
				const audioContext = new AudioContext();
				const destination = audioContext.createMediaStreamDestination();
				const oscillator = audioContext.createOscillator();
				oscillator.frequency.value = 0;
				const gainNode = audioContext.createGain();
				gainNode.gain.value = 0.001;
				oscillator.connect(gainNode);
				gainNode.connect(destination);
				oscillator.start();
				const silentAudioTrack = destination.stream.getAudioTracks()[0];
				stream.addTrack(silentAudioTrack);
			}

      // PeerConnection 생성
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ],
        bundlePolicy: 'max-bundle',
        rtcpMuxPolicy: 'require',
      });
      peerConnection.current = pc;

      // 오디오/비디오 트랙 추가
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];
      pc.addTrack(audioTrack, stream);
      const videoSender = pc.addTrack(videoTrack, stream);

      // 비디오 인코딩 파라미터 설정
      const videoParams = videoSender.getParameters();
      if (!videoParams.encodings) {
        videoParams.encodings = [{}];
      }
      videoParams.encodings[0].maxBitrate = config.bitrate || 8000000;
      videoParams.encodings[0].maxFramerate = config.fps || 60;
      await videoSender.setParameters(videoParams);

      // 연결 상태 모니터링
      pc.onconnectionstatechange = () => {
        const state = pc.connectionState;
        setStatus(prev => ({
          ...prev,
          connectionState: state,
          isStreaming: state === 'connected',
          error: state === 'failed' || state === 'disconnected' ? 'Connection failed' : undefined,
        }));
      };

      pc.oniceconnectionstatechange = () => {
        const state = pc.iceConnectionState;
        setStatus(prev => ({ ...prev, iceState: state }));
      };

      // Offer 생성
      const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });

      // SDP 코덱 설정
      offer.sdp = setCodecPreferences(offer.sdp!);
      await pc.setLocalDescription(offer);

      // ICE candidate 수집 대기
      await new Promise<void>((resolve) => {
        if (pc.iceGatheringState === 'complete') {
          resolve();
        } else {
          pc.onicegatheringstatechange = () => {
            if (pc.iceGatheringState === 'complete') {
              resolve();
            }
          };
        }
      });

      // WHIP 서버에 연결
      const response = await fetch(config.whipUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/sdp',
          ...(config.bearerToken && { 'Authorization': `Bearer ${config.bearerToken}` }),
        },
        body: pc.localDescription?.sdp,
      });

      if (!response.ok) {
        throw new Error(`WHIP connection failed: ${response.status} ${response.statusText}`);
      }

      // Answer SDP 설정
      const answerSdp = await response.text();
      await pc.setRemoteDescription({
        type: 'answer',
        sdp: answerSdp,
      });

      // FPS 업데이트 시작
      lastFrameTime.current = performance.now();
      frameCounter.current = 0;

    } catch (error) {
      setStatus(prev => ({
        ...prev,
        isStreaming: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
      stopStreaming();
      throw error;
    }
  }, [config, canvasRef, setCodecPreferences, audios]);

  const stopStreaming = useCallback(() => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
      mediaStream.current = null;
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    setStatus({
      isStreaming: false,
      connectionState: 'disconnected',
      iceState: 'disconnected',
      fps: 0,
      frameCount: 0,
    });
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopStreaming();
    };
  }, [stopStreaming]);

  // FPS 업데이트
  useEffect(() => {
    if (status.isStreaming) {
      const animationFrame = requestAnimationFrame(updateFps);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [status.isStreaming, updateFps]);

  return {
    status,
    startStreaming,
    stopStreaming,
  };
};
