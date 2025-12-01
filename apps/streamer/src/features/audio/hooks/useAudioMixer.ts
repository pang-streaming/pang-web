import { useEffect, useRef, useState } from "react";
import { useAudioStore } from "../stores/useAudioStore";

export const useAudioMixer = () => {
  const [mixedTrack, setMixedTrack] = useState<MediaStreamTrack | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const sourceNodesRef = useRef<Map<string, MediaStreamAudioSourceNode>>(
    new Map()
  );
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());
  const silentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Store에서 직접 구독 - ID 변경만 감지
  const audioTrackIds = useAudioStore((state) =>
    state.audioTracks
      .map((t) => t.id)
      .sort()
      .join(",")
  );
  const audioTracks = useAudioStore((state) => state.audioTracks);

  // gain 값들을 문자열로 변환하여 의존성으로 사용
  const gainValues = useAudioStore((state) =>
    state.audioTracks.map((t) => `${t.id}:${t.gain}`).join(",")
  );

  // AudioContext resume 함수 (사용자 상호작용 시 호출해야 함)
  const resumeAudioContext = async (): Promise<boolean> => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return false;

    if (audioContext.state === "suspended") {
      try {
        await audioContext.resume();
      } catch {
        return false;
      }
    }

    return audioContext.state === "running";
  };

  // AudioContext와 destination 초기화 (한 번만)
  useEffect(() => {
    const audioContext = new AudioContext({
      latencyHint: "interactive",
      sampleRate: 48000,
    });
    audioContextRef.current = audioContext;

    const destination = audioContext.createMediaStreamDestination();
    destinationRef.current = destination;

    // 초기화 시 바로 무음 소스 연결 (오디오 트랙이 없을 때도 mixedTrack이 유효하도록)
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate);

    const bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.loop = true;

    const silentGain = audioContext.createGain();
    silentGain.gain.value = 0;

    bufferSource.connect(silentGain);
    silentGain.connect(destination);
    bufferSource.start();
    silentSourceRef.current = bufferSource;

    const mixed = destination.stream.getAudioTracks()[0];
    setMixedTrack(mixed);

    return () => {
      sourceNodesRef.current.forEach((node) => node.disconnect());
      gainNodesRef.current.forEach((node) => node.disconnect());

      if (silentSourceRef.current) {
        silentSourceRef.current.stop();
        silentSourceRef.current.disconnect();
      }

      if (audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, []);

  // 트랙 추가/제거 처리
  useEffect(() => {
    const audioContext = audioContextRef.current;
    const destination = destinationRef.current;

    if (!audioContext || !destination) return;

    const tracks = audioTracks.map((t) => t.track);
    const currentTrackIds = new Set(tracks.map((t) => t.id));
    const existingTrackIds = new Set(sourceNodesRef.current.keys());

    // 제거된 트랙 정리
    existingTrackIds.forEach((trackId) => {
      if (!currentTrackIds.has(trackId)) {
        const source = sourceNodesRef.current.get(trackId);
        const gain = gainNodesRef.current.get(trackId);

        if (source) {
          source.disconnect();
          sourceNodesRef.current.delete(trackId);
        }
        if (gain) {
          gain.disconnect();
          gainNodesRef.current.delete(trackId);
        }
      }
    });

    // 새로운 트랙 추가
    tracks.forEach((track) => {
      if (!existingTrackIds.has(track.id)) {
        const source = audioContext.createMediaStreamSource(
          new MediaStream([track])
        );
        const gainNode = audioContext.createGain();

        const trackInfo = audioTracks.find((t) => t.track.id === track.id);
        const trackGain = trackInfo?.gain || 1.0;
        gainNode.gain.value = trackGain;

        source.connect(gainNode);
        gainNode.connect(destination);

        sourceNodesRef.current.set(track.id, source);
        gainNodesRef.current.set(track.id, gainNode);
      }
    });

    // 무음 트랙 처리 (초기화 시 이미 생성됨)
    if (tracks.length > 0 && silentSourceRef.current) {
      try {
        silentSourceRef.current.stop();
        silentSourceRef.current.disconnect();
      } catch {
        // 이미 정지된 경우 무시
      }
      silentSourceRef.current = null;
    } else if (tracks.length === 0 && !silentSourceRef.current) {
      const bufferSize = audioContext.sampleRate * 2;
      const buffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate);

      const bufferSource = audioContext.createBufferSource();
      bufferSource.buffer = buffer;
      bufferSource.loop = true;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0;

      bufferSource.connect(gainNode);
      gainNode.connect(destination);
      bufferSource.start();

      silentSourceRef.current = bufferSource;
    }
  }, [audioTrackIds, audioTracks]);

  // Gain 값 업데이트
  useEffect(() => {
    audioTracks.forEach((trackInfo) => {
      const gainNode = gainNodesRef.current.get(trackInfo.track.id);
      if (gainNode) {
        gainNode.gain.setValueAtTime(
          trackInfo.gain,
          audioContextRef.current?.currentTime || 0
        );
      }
    });
  }, [gainValues, audioTracks]);

  return { mixedTrack, resumeAudioContext };
};
