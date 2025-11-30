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

  console.log("[MIXER DEBUG] useAudioMixer render:", {
    mixedTrackExists: !!mixedTrack,
    mixedTrackId: mixedTrack?.id,
    mixedTrackState: mixedTrack?.readyState,
    audioContextState: audioContextRef.current?.state,
    audioTrackCount: audioTracks.length,
    audioTrackIds,
  });

  // AudioContext resume 함수 (사용자 상호작용 시 호출해야 함)
  const resumeAudioContext = async (): Promise<boolean> => {
    const audioContext = audioContextRef.current;
    if (!audioContext) {
      console.warn("[MIXER DEBUG] resumeAudioContext: No AudioContext");
      return false;
    }

    if (audioContext.state === "suspended") {
      console.log("[MIXER DEBUG] resumeAudioContext: Resuming...");
      try {
        await audioContext.resume();
        console.log("[MIXER DEBUG] resumeAudioContext: Resumed, state:", audioContext.state);
      } catch (err) {
        console.error("[MIXER DEBUG] resumeAudioContext: Failed", err);
        return false;
      }
    }

    return audioContext.state === "running";
  };

  // AudioContext와 destination 초기화 (한 번만)
  useEffect(() => {
    console.log("[MIXER DEBUG] Initializing AudioContext...");

    const audioContext = new AudioContext({
      latencyHint: "interactive",
      sampleRate: 48000,
    });
    audioContextRef.current = audioContext;

    console.log("[MIXER DEBUG] AudioContext created:", {
      state: audioContext.state,
      sampleRate: audioContext.sampleRate,
      baseLatency: audioContext.baseLatency,
    });

    // AudioContext가 suspended 상태일 경우 resume
    if (audioContext.state === "suspended") {
      console.log("[MIXER DEBUG] AudioContext is suspended, resuming...");
      audioContext.resume().then(() => {
        console.log("[MIXER DEBUG] AudioContext resumed, new state:", audioContext.state);
      }).catch((err) => {
        console.error("[MIXER DEBUG] AudioContext resume failed:", err);
      });
    }

    const destination = audioContext.createMediaStreamDestination();
    destinationRef.current = destination;

    console.log("[MIXER DEBUG] MediaStreamDestination created:", {
      streamId: destination.stream.id,
      streamActive: destination.stream.active,
      audioTracksInDestination: destination.stream.getAudioTracks().length,
    });

    // 초기화 시 바로 무음 소스 연결 (오디오 트랙이 없을 때도 mixedTrack이 유효하도록)
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate);
    // 스테레오 무음 버퍼 (기본값 0)

    const bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.loop = true;

    const silentGain = audioContext.createGain();
    silentGain.gain.value = 0; // 완전 무음

    bufferSource.connect(silentGain);
    silentGain.connect(destination);
    bufferSource.start();
    silentSourceRef.current = bufferSource;

    console.log("[MIXER DEBUG] Silent source connected and started");

    const mixed = destination.stream.getAudioTracks()[0];

    console.log("[MIXER DEBUG] Mixed track from destination:", {
      exists: !!mixed,
      id: mixed?.id,
      kind: mixed?.kind,
      enabled: mixed?.enabled,
      muted: mixed?.muted,
      readyState: mixed?.readyState,
      label: mixed?.label,
    });

    setMixedTrack(mixed);

    console.log("[MIXER DEBUG] AudioContext initialized with silent source:", {
      sampleRate: audioContext.sampleRate,
      state: audioContext.state,
      mixedTrack: mixed
        ? { id: mixed.id, enabled: mixed.enabled, readyState: mixed.readyState }
        : null,
    });

    // cleanup: 컴포넌트 언마운트 시에만 정리
    return () => {
      console.log("Cleaning up AudioContext");
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
  }, []); // 빈 의존성 배열 - 한 번만 실행

  // 트랙 추가/제거 처리
  useEffect(() => {
    const audioContext = audioContextRef.current;
    const destination = destinationRef.current;

    if (!audioContext || !destination) return;

    const tracks = audioTracks.map((t) => t.track);
    const currentTrackIds = new Set(tracks.map((t) => t.id));
    const existingTrackIds = new Set(sourceNodesRef.current.keys());

    console.log("useAudioMixer: tracks changed", {
      count: tracks.length,
      ids: Array.from(currentTrackIds),
      existingIds: Array.from(existingTrackIds),
    });

    // 제거된 트랙 정리
    existingTrackIds.forEach((trackId) => {
      if (!currentTrackIds.has(trackId)) {
        console.log(`Removing track: ${trackId}`);
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
        console.log(`Adding track: ${track.id}`, {
          enabled: track.enabled,
          readyState: track.readyState,
          label: track.label,
        });

        const source = audioContext.createMediaStreamSource(
          new MediaStream([track])
        );
        const gainNode = audioContext.createGain();

        const trackInfo = audioTracks.find((t) => t.track.id === track.id);
        const trackGain = trackInfo?.gain || 1.0;
        gainNode.gain.value = trackGain;

        // 트랙 설정 로깅 (디버깅용)
        console.log(`Setting initial gain for ${track.id}:`, {
          gain: trackGain,
          sampleRate: track.getSettings().sampleRate,
          channelCount: track.getSettings().channelCount,
          contextSampleRate: audioContext.sampleRate,
        });

        source.connect(gainNode);
        gainNode.connect(destination);

        sourceNodesRef.current.set(track.id, source);
        gainNodesRef.current.set(track.id, gainNode);

        console.log("Audio graph updated:", {
          totalSources: sourceNodesRef.current.size,
          destinationTrack: destination.stream.getAudioTracks()[0]?.id,
        });
      }
    });

    // 무음 트랙 처리 (초기화 시 이미 생성됨)
    // 실제 오디오 트랙이 있으면 무음 소스 제거, 없으면 유지
    if (tracks.length > 0 && silentSourceRef.current) {
      console.log("Removing silent track - real audio tracks present");
      try {
        silentSourceRef.current.stop();
        silentSourceRef.current.disconnect();
      } catch {
        // 이미 정지된 경우 무시
      }
      silentSourceRef.current = null;
    } else if (tracks.length === 0 && !silentSourceRef.current) {
      // 트랙이 모두 제거되면 다시 무음 소스 생성
      console.log("Re-adding silent track - no audio tracks");

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
        console.log(
          `Updating gain for track ${trackInfo.track.id}: ${trackInfo.gain}`
        );
        gainNode.gain.setValueAtTime(
          trackInfo.gain,
          audioContextRef.current?.currentTime || 0
        );
      }
    });
  }, [gainValues, audioTracks]);

  return { mixedTrack, resumeAudioContext };
};
