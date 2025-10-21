import {RefObject, useCallback, useEffect, useRef, useState} from 'react';
import {useAudioMixer} from "@/features/audio/hooks/useAudioMixer";
import {useStreamingSettings} from "@/features/whip/useStreamingSettings";

export interface WhipBroadcastConfig {
  whipUrl: string;
  bitrate?: number;
  fps?: number;
  secretKey?: string;
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
	config: WhipBroadcastConfig
) => {
	const {setCodecPreferences} = useStreamingSettings();
  const [status, setStatus] = useState<WhipBroadcastStatus>({
    isStreaming: false,
    connectionState: 'disconnected',
    iceState: 'disconnected',
    fps: 0,
    frameCount: 0,
  });
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const audioSenderRef = useRef<RTCRtpSender | null>(null);
  const lastFrameTime = useRef<number>(0);
  const frameCounter = useRef<number>(0);
	const mixedAudioTrack = useAudioMixer();
	
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

  const startStreaming = useCallback(async () => {
    if (!canvasRef.current || !config.whipUrl) {
      throw new Error('Canvas reference or WHIP URL is missing');
    }

    try {
      const stream = canvasRef.current.captureStream(config.fps || 60);
      mediaStream.current = stream;

			if (mixedAudioTrack) {
				stream.addTrack(mixedAudioTrack);
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

      console.log('Stream tracks:', {
				audio: stream.getAudioTracks().length,
	      video: stream.getVideoTracks().length,
	      audioTrackDetails: stream.getAudioTracks().map(t => ({ id: t.id, enabled: t.enabled, readyState: t.readyState })),
	      mixedAudioTrack: mixedAudioTrack ? { id: mixedAudioTrack.id, enabled: mixedAudioTrack.enabled, readyState: mixedAudioTrack.readyState } : null
      })
			
			// 오디오/비디오 트랙 추가
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];
      
      // 오디오 트랙이 있을 때만 추가
      if (audioTrack) {
        console.log('Adding audio track to peer connection:', audioTrack.id);
	      audioSenderRef.current = pc.addTrack(audioTrack, stream);
      } else {
        console.warn('No audio track available to add to peer connection');
      }
      
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
			
			const whipUrl = config.whipUrl + config.secretKey;
			
      // WHIP 서버에 연결
      const response = await fetch(whipUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/sdp'
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
  }, [canvasRef, config, mixedAudioTrack, setCodecPreferences]);

  const stopStreaming = useCallback(() => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
      mediaStream.current = null;
    }

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    
    audioSenderRef.current = null;

    setStatus({
      isStreaming: false,
      connectionState: 'disconnected',
      iceState: 'disconnected',
      fps: 0,
      frameCount: 0,
    });
  }, []);
  useEffect(() => {
    return () => {
      stopStreaming();
    };
  }, [stopStreaming]);

  useEffect(() => {
    if (status.isStreaming) {
      const animationFrame = requestAnimationFrame(updateFps);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [status.isStreaming, updateFps]);
  
  // 방송 중 오디오 트랙 변경 시 실시간 교체
  useEffect(() => {
    if (status.isStreaming && audioSenderRef.current && mixedAudioTrack) {
      console.log('Replacing audio track during streaming', {
        newTrackId: mixedAudioTrack.id,
        enabled: mixedAudioTrack.enabled,
        readyState: mixedAudioTrack.readyState
      });
      
      audioSenderRef.current.replaceTrack(mixedAudioTrack)
        .then(() => {
          console.log('Audio track replaced successfully');
        })
        .catch(err => {
          console.error('Failed to replace audio track:', err);
        });
    }
  }, [mixedAudioTrack, status.isStreaming]);

  return {
    status,
    startStreaming,
    stopStreaming,
  };
};
