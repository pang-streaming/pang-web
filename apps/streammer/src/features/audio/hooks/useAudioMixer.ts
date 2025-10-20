import {useEffect, useRef, useState} from 'react';
import {useAudioStore} from "@/features/audio/stores/useAudioStore";

export const useAudioMixer = () => {
  const [mixedTrack, setMixedTrack] = useState<MediaStreamTrack | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodesRef = useRef<MediaStreamAudioSourceNode[]>([]);
  const gainNodesRef =  useRef<Map<string, GainNode>>(new Map());
  
  // Store에서 직접 구독 - ID 변경만 감지
  const audioTrackIds = useAudioStore(state => 
    state.audioTracks.map(t => t.id).sort().join(',')
  );
  const audioTracks = useAudioStore(state => state.audioTracks);
  
  // gain 값들을 문자열로 변환하여 의존성으로 사용
  const gainValues = useAudioStore(state => 
    state.audioTracks.map(t => `${t.id}:${t.gain}`).join(',')
  );

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
      gainNodesRef.current = new Map();
      
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

		const newGainNodes = new Map<string, GainNode>();
    // 오디오 믹싱
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    const destination = audioContext.createMediaStreamDestination();

    tracks.forEach(track => {
      const source = audioContext.createMediaStreamSource(new MediaStream([track]));
      const gainNode = audioContext.createGain();
			
			const trackInfo = audioTracks.find(t => t.track.id === track.id);
	    const trackGain = trackInfo?.gain || 1.0;
			gainNode.gain.value = trackGain;
			
			console.log(`Setting initial gain for ${track.id}: ${trackGain}`);
      
      source.connect(gainNode);
      gainNode.connect(destination);
      
      sourceNodesRef.current.push(source);
      newGainNodes.set(track.id, gainNode);
    });
		
		gainNodesRef.current = newGainNodes;

    const mixed = destination.stream.getAudioTracks()[0];
    setMixedTrack(mixed);

    return cleanup;
  }, [audioTrackIds]);
	
	useEffect(() => {
		audioTracks.forEach(trackInfo => {
			const gainNode = gainNodesRef.current.get(trackInfo.track.id);
			if (gainNode) {
				console.log(`Updating gain for track ${trackInfo.track.id}: ${trackInfo.gain}`);
				gainNode.gain.setValueAtTime(trackInfo.gain, audioContextRef.current?.currentTime || 0);
			}
		});
	}, [gainValues]);

  return mixedTrack;
};
