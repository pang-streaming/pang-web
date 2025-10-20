import {useEffect, useRef, useState} from 'react';
import {useAudioStore} from "@/features/audio/stores/useAudioStore";

export const useAudioMixer = () => {
  const [mixedTrack, setMixedTrack] = useState<MediaStreamTrack | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const destinationRef = useRef<MediaStreamDestination | null>(null);
  const sourceNodesRef = useRef<Map<string, MediaStreamAudioSourceNode>>(new Map());
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());
  const silentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  // Store에서 직접 구독 - ID 변경만 감지
  const audioTrackIds = useAudioStore(state => 
    state.audioTracks.map(t => t.id).sort().join(',')
  );
  const audioTracks = useAudioStore(state => state.audioTracks);
  
  // gain 값들을 문자열로 변환하여 의존성으로 사용
  const gainValues = useAudioStore(state => 
    state.audioTracks.map(t => `${t.id}:${t.gain}`).join(',')
  );

  // AudioContext와 destination 초기화 (한 번만)
  useEffect(() => {
    const audioContext = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 48000,
    });
    audioContextRef.current = audioContext;
    
    const destination = audioContext.createMediaStreamDestination();
    destinationRef.current = destination;
    
    const mixed = destination.stream.getAudioTracks()[0];
    setMixedTrack(mixed);
    
    console.log('AudioContext initialized:', {
      sampleRate: audioContext.sampleRate,
      state: audioContext.state
    });
    
    // cleanup: 컴포넌트 언마운트 시에만 정리
    return () => {
      console.log('Cleaning up AudioContext');
      sourceNodesRef.current.forEach(node => node.disconnect());
      gainNodesRef.current.forEach(node => node.disconnect());
      
      if (silentSourceRef.current) {
        silentSourceRef.current.stop();
        silentSourceRef.current.disconnect();
      }
      
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []); // 빈 의존성 배열 - 한 번만 실행

  // 트랙 추가/제거 처리
  useEffect(() => {
    const audioContext = audioContextRef.current;
    const destination = destinationRef.current;
    
    if (!audioContext || !destination) return;
    
    const tracks = audioTracks.map(t => t.track);
    const currentTrackIds = new Set(tracks.map(t => t.id));
    const existingTrackIds = new Set(sourceNodesRef.current.keys());
    
    console.log('useAudioMixer: tracks changed', {
      count: tracks.length,
      ids: Array.from(currentTrackIds),
      existingIds: Array.from(existingTrackIds)
    });
    
    // 제거된 트랙 정리
    existingTrackIds.forEach(trackId => {
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
    tracks.forEach(track => {
      if (!existingTrackIds.has(track.id)) {
        console.log(`Adding track: ${track.id}`);
        
        const source = audioContext.createMediaStreamSource(new MediaStream([track]));
        const gainNode = audioContext.createGain();
        
        const trackInfo = audioTracks.find(t => t.track.id === track.id);
        const trackGain = trackInfo?.gain || 1.0;
        gainNode.gain.value = trackGain;
        
        // 트랙 설정 로깅 (디버깅용)
        console.log(`Setting initial gain for ${track.id}:`, {
          gain: trackGain,
          sampleRate: track.getSettings().sampleRate,
          channelCount: track.getSettings().channelCount,
          contextSampleRate: audioContext.sampleRate
        });
        
        source.connect(gainNode);
        gainNode.connect(destination);
        
        sourceNodesRef.current.set(track.id, source);
        gainNodesRef.current.set(track.id, gainNode);
      }
    });
    
    // 무음 트랙 처리
    if (tracks.length === 0) {
      // 트랙이 없으면 무음 소스 추가
      if (!silentSourceRef.current) {
        console.log('Adding silent track');
        
        // 2초 길이의 무음 버퍼 생성
        const bufferSize = audioContext.sampleRate * 2;
        const buffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate);
        
        // 양쪽 채널 모두 완전 무음으로 초기화
        for (let channel = 0; channel < 2; channel++) {
          const data = buffer.getChannelData(channel);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = 0;
          }
        }
        
        const bufferSource = audioContext.createBufferSource();
        bufferSource.buffer = buffer;
        bufferSource.loop = true;
        
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0; // 완전 무음
        
        bufferSource.connect(gainNode);
        gainNode.connect(destination);
        bufferSource.start();
        
        silentSourceRef.current = bufferSource;
      }
    } else {
      // 트랙이 있으면 무음 소스 제거
      if (silentSourceRef.current) {
        console.log('Removing silent track');
        silentSourceRef.current.stop();
        silentSourceRef.current.disconnect();
        silentSourceRef.current = null;
      }
    }
  }, [audioTrackIds, audioTracks]);
  
  // Gain 값 업데이트
  useEffect(() => {
    audioTracks.forEach(trackInfo => {
      const gainNode = gainNodesRef.current.get(trackInfo.track.id);
      if (gainNode) {
        console.log(`Updating gain for track ${trackInfo.track.id}: ${trackInfo.gain}`);
        gainNode.gain.setValueAtTime(trackInfo.gain, audioContextRef.current?.currentTime || 0);
      }
    });
  }, [gainValues, audioTracks]);

  return mixedTrack;
};
