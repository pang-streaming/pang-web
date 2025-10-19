import { useEffect, useRef, useState } from 'react';
import {useAudioStore} from "@/features/audio/stores/useAudioStore";

export const useAudioMixer = () => {
  const [mixedTrack, setMixedTrack] = useState<MediaStreamTrack | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodesRef = useRef<MediaStreamAudioSourceNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  
  // Store에서 직접 구독 - ID 변경만 감지
  const audioTrackIds = useAudioStore(state => 
    state.audioTracks.map(t => t.id).sort().join(',')
  );
  const audioTracks = useAudioStore(state => state.audioTracks);

  useEffect(() => {
    const tracks = audioTracks.map(t => t.track);
	  console.log('useAudioMixer: tracks changed', {
			count: tracks.length,
		  ids: tracks.map(t => t.id),
	  })
		
    // 기존 리소스 정리
    const cleanup = () => {
      sourceNodesRef.current.forEach(node => node.disconnect());
      gainNodesRef.current.forEach(node => node.disconnect());
      sourceNodesRef.current = [];
      gainNodesRef.current = [];
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };

    cleanup();

    if (tracks.length === 0) {
      // 무음 트랙 생성
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const destination = audioContext.createMediaStreamDestination();
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.value = 0;
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.001;
      oscillator.connect(gainNode);
      gainNode.connect(destination);
      oscillator.start();
      
      const silentTrack = destination.stream.getAudioTracks()[0];
      setMixedTrack(silentTrack);
      return cleanup;
    }

    // 오디오 믹싱
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    const destination = audioContext.createMediaStreamDestination();

    tracks.forEach(track => {
      const source = audioContext.createMediaStreamSource(new MediaStream([track]));
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1.0 / tracks.length;
      
      source.connect(gainNode);
      gainNode.connect(destination);
      
      sourceNodesRef.current.push(source);
      gainNodesRef.current.push(gainNode);
    });

    const mixed = destination.stream.getAudioTracks()[0];
    setMixedTrack(mixed);

    return cleanup;
  }, [audioTrackIds]);

  return mixedTrack;
};
