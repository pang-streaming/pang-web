import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface VolumeMeterProps {
  label: string;
  color?: string;
}

export const VolumeMixer: React.FC = () => {
  return (
    <MixerContainer>
      <Title>볼륨 믹서</Title>
      <VolumeMeter label="마이크" color="#ff4d6d" />
      <VolumeMeter label="시스템" color="#ff4d6d" />
    </MixerContainer>
  );
};

const VolumeMeter: React.FC<VolumeMeterProps> = ({ label, color = "#ff4d6d" }) => {
  const [volume, setVolume] = useState(-30);
  const [meterValue, setMeterValue] = useState(-60);

  // Web Audio API 관련
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (label !== "마이크") return; 

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaStreamSource(stream);

        const analyser = audioCtx.createAnalyser();
        const gainNode = audioCtx.createGain();

        analyser.fftSize = 256;
        source.connect(gainNode).connect(analyser);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        gainNodeRef.current = gainNode;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateVolume = () => {
          analyser.getByteTimeDomainData(dataArray);
          // 평균 진폭 계산
          const avg = dataArray.reduce((a, b) => a + Math.abs(b - 128), 0) / dataArray.length;
          const db = 20 * Math.log10(avg / 128);
          setMeterValue(Math.max(-60, Math.min(db, 0))); // -60 ~ 0 dB 제한
          requestAnimationFrame(updateVolume);
        };

        updateVolume();
      } catch (err) {
        console.error("마이크 접근 실패:", err);
      }
    };

    initAudio();
  }, [label]);

  // 슬라이더 볼륨 조정
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    const gain = Math.pow(10, newVolume / 20); // dB → gain
    if (gainNodeRef.current) gainNodeRef.current.gain.value = gain;
  };

  const getMeterColor = (db: number) => {
    if (db < -30) return "#8aff8a"; // 초록
    if (db < -10) return "#ffd966"; // 노랑
    return "#ff6b6b"; // 빨강
  };

  const meterPercent = ((meterValue + 60) / 60) * 100;

  return (
    <MeterContainer>
      <Label>{label}</Label>

      <MeterTrack>
        <MeterFill style={{ width: `${meterPercent}%`, backgroundColor: getMeterColor(meterValue) }} />
      </MeterTrack>

      <Scale>
        {Array.from({ length: 13 }, (_, i) => -60 + i * 5).map((db) => (
          <span key={db}>{db}</span>
        ))}
      </Scale>

      <Slider
        type="range"
        min={-60}
        max={0}
        value={volume}
        onChange={handleVolumeChange}
        color={color}
      />
    </MeterContainer>
  );
};

const MixerContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  gap: 24px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #3a3a3a;
  padding: 8px 15px;
  border-radius: 6px;
  margin-top: 0%;
`;

const MeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -10%;
  gap: 5px;
`;

const Label = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-top: 5px;
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

const Scale = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #ccc;
  margin-top: 1px;
`;

const Slider = styled.input<{ color: string }>`
  width: 100%;
  height: 6px;
  appearance: none;
  background: linear-gradient(to right, ${({ color }) => color} 0%, #fff 100%);
  border-radius: 10px;
  outline: none;
  margin-bottom: 20px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    cursor: pointer;
  }
`;