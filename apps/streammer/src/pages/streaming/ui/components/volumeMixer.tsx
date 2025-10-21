import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAudioStore } from "../../../../features/audio/stores/useAudioStore";

interface VolumeMeterProps {
  label: string;
  trackId: string;
  track: MediaStreamTrack;
  source?: string;
  color?: string;
  onRemove?: () => void;
}

export const VolumeMixer: React.FC = () => {
  const audioTracks = useAudioStore(state => state.audioTracks);
  const { removeAudioTrack } = useAudioStore();

  return (
    <MixerContainer>
      <Title>볼륨 믹서 ({audioTracks.length})</Title>
      {audioTracks.length === 0 ? (
        <EmptyMessage>오디오 트랙이 없습니다</EmptyMessage>
      ) : (
        audioTracks.map((audioTrack) => (
          <VolumeMeter
            key={audioTrack.id}
            label={audioTrack.label || 'Unknown'}
            trackId={audioTrack.id}
            track={audioTrack.track}
            source={audioTrack.source}
            color={audioTrack.source === 'microphone' ? '#ff4d6d' : audioTrack.source === 'screen' ? '#4d9fff' : '#9f4dff'}
            onRemove={() => removeAudioTrack(audioTrack.id)}
          />
        ))
      )}
    </MixerContainer>
  );
};

const VolumeMeter: React.FC<VolumeMeterProps> = ({ label, trackId, track, source, color = "#ff4d6d", onRemove }) => {
  const [volume, setVolume] = useState(0);
  const [meterValue, setMeterValue] = useState(-60);

  // Web Audio API 관련
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const audioCtx = new AudioContext();
        const stream = new MediaStream([track]);
        const source = audioCtx.createMediaStreamSource(stream);

        const analyser = audioCtx.createAnalyser();
        const gainNode = audioCtx.createGain();

        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(gainNode).connect(analyser);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        gainNodeRef.current = gainNode;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateVolume = () => {
          if (!analyserRef.current) return;
          
          analyser.getByteTimeDomainData(dataArray);
          // 평균 진폭 계산
          const avg = dataArray.reduce((a, b) => a + Math.abs(b - 128), 0) / dataArray.length;
          const db = avg > 0 ? 20 * Math.log10(avg / 128) : -60;
          setMeterValue(Math.max(-60, Math.min(db, 0))); // -60 ~ 0 dB 제한
          animationFrameRef.current = requestAnimationFrame(updateVolume);
        };

        updateVolume();
      } catch (err) {
        console.error("오디오 분석 실패:", err);
      }
    };

    initAudio();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [track, trackId]);

  // 슬라이더 볼륨 조정
  const { setTrackGain } = useAudioStore();
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    
    // store에 gain 업데이트 (믹서가 자동으로 적용)
    console.log(`Volume slider changed for ${trackId}: ${newVolume}dB`);
    setTrackGain(trackId, newVolume);
  };

  const getMeterColor = (db: number) => {
    if (db < -30) return "#8aff8a"; // 초록
    if (db < -10) return "#ffd966"; // 노랑
    return "#ff6b6b"; // 빨강
  };

  const meterPercent = ((meterValue + 60) / 60) * 100;

  return (
    <MeterContainer>
      <HeaderRow>
        <Label>
          {label}
          {source && <SourceBadge source={source}>{source}</SourceBadge>}
        </Label>
        {onRemove && (
          <RemoveButton onClick={onRemove} title="오디오 제거">
            ✕
          </RemoveButton>
        )}
      </HeaderRow>

      <MeterTrack>
        <MeterFill style={{ width: `${meterPercent}%`, backgroundColor: getMeterColor(meterValue) }} />
      </MeterTrack>

      <VolumeControl>
        <VolumeLabel>볼륨: {volume}dB</VolumeLabel>
        <Slider
          type="range"
          min={-60}
          max={12}
          value={volume}
          onChange={handleVolumeChange}
          color={color}
        />
      </VolumeControl>
    </MeterContainer>
  );
};

const MixerContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  gap: 16px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #3a3a3a;
  padding: 8px 15px;
  border-radius: 6px;
  margin: 0;
`;

const EmptyMessage = styled.div`
  font-size: 14px;
  color: #999;
  text-align: center;
  padding: 20px;
`;

const MeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SourceBadge = styled.span<{ source: string }>`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${({ source }) => 
    source === 'microphone' ? '#ff4d6d' : 
    source === 'screen' ? '#4d9fff' : 
    '#9f4dff'};
  color: white;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 107, 107, 0.1);
  }
`;

const MeterTrack = styled.div`
  position: relative;
  height: 6px;
  width: 100%;
  background-color: #3a3a3a;
  border-radius: 6px;
  overflow: hidden;
`;

const MeterFill = styled.div`
  height: 100%;
  border-radius: 6px;
  transition: width 0.2s ease, background-color 0.2s ease;
`;

const VolumeControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VolumeLabel = styled.div`
  font-size: 11px;
  color: #aaa;
`;

const Slider = styled.input<{ color: string }>`
  width: 100%;
  height: 6px;
  appearance: none;
  background: linear-gradient(to right, ${({ color }) => color} 0%, #fff 100%);
  border-radius: 10px;
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    cursor: pointer;
    border: none;
  }
`;