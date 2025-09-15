import { useState, useEffect, useRef } from 'react';

export interface AudioLevelData {
  deviceId: string;
  level: number;
  muted: boolean;
}

export const useAudioLevels = (sources: any[]) => {
  const [audioLevels, setAudioLevels] = useState<AudioLevelData[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const audioSources = sources.filter(source => source.type === 'audio' && source.deviceId);
    
    if (audioSources.length === 0) {
      setAudioLevels([]);
      return;
    }

    const setupAudioMonitoring = async () => {
      try {
        // 오디오 컨텍스트 생성
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const audioContext = audioContextRef.current;
        
        // 마이크 스트림 가져오기
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { deviceId: audioSources[0].deviceId } 
        });
        
        // 오디오 소스 생성
        const source = audioContext.createMediaStreamSource(stream);
        
        // 분석기 생성
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        
        source.connect(analyser);
        
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        
        // 오디오 레벨 모니터링 시작
        const monitorAudioLevels = () => {
          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
            
            // 평균 레벨 계산
            const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
            const normalizedLevel = (average / 255) * 100; // 0-100 범위로 정규화
            
            setAudioLevels(prev => {
              const existing = prev.find(level => level.deviceId === audioSources[0].deviceId);
              if (existing) {
                return prev.map(level => 
                  level.deviceId === audioSources[0].deviceId 
                    ? { ...level, level: normalizedLevel }
                    : level
                );
              } else {
                return [...prev, {
                  deviceId: audioSources[0].deviceId,
                  level: normalizedLevel,
                  muted: false
                }];
              }
            });
          }
          
          animationFrameRef.current = requestAnimationFrame(monitorAudioLevels);
        };
        
        monitorAudioLevels();
        
      } catch (error) {
        console.error('오디오 모니터링 설정 오류:', error);
      }
    };

    setupAudioMonitoring();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [sources]);

  return audioLevels;
};
