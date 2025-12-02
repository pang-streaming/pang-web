import { useEffect, useState, useRef } from "react";
import Pause from "@/app/assets/pause.svg?react";
import Resume from "@/app/assets/resume.svg?react";
import Sound from "@/app/assets/sound.svg?react";
import Muted from "@/app/assets/sound-muted.svg?react";
import Controller from "@/app/assets/controller.svg?react";
import Pip from "@/app/assets/pip.svg?react";
import FullScreen from "@/app/assets/full-screen.svg?react";
import { Slider } from "../../chatting-section/ui/slider";
import * as S from '../style';
import styled from "styled-components";

interface VideoControlsProps {
  isVisible: boolean;
  isMobile: boolean;
  paused: boolean;
  volume: number;
  muted: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isLive?: boolean;
  onTogglePause: () => void;
  onToggleMuted: () => void;
  onUpdateVolume: (volume: number) => void;
  onPip: () => void;
  onFullScreen: () => void;
}

export const VideoControls = ({
  isVisible,
  isMobile,
  paused,
  volume,
  muted,
  videoRef,
  isLive = true,
  onTogglePause,
  onToggleMuted,
  onUpdateVolume,
  onPip,
  onFullScreen,
}: VideoControlsProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(video.currentTime);
      }
    };
    const updateDuration = () => setDuration(video.duration || 0);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
    };
  }, [videoRef]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleSeekStart = () => {
    isSeekingRef.current = true;
  };

  const handleSeekEnd = () => {
    isSeekingRef.current = false;
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
	
	const SoundMuteButton = muted || volume === 0 ? Muted : Sound;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {!isLive && duration > 0 && (
        <SeekbarContainer $isVisible={isVisible}>
          <SeekbarProgress $progress={progress} />
          <SeekbarInput
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            onTouchStart={handleSeekStart}
            onTouchEnd={handleSeekEnd}
          />
        </SeekbarContainer>
      )}
      <S.BottomController isVisible={isVisible}>
        <S.LeftIconContainer>
          <PlayPauseButton onClick={onTogglePause}>
	          {paused ? <Pause/> : <Resume/>}
          </PlayPauseButton>
          <FrontMatter>
            {formatTime(currentTime)}
            {!isLive && duration > 0 && ` / ${formatTime(duration)}`}
          </FrontMatter>
          <S.VolumeIconWrapper onClick={onToggleMuted}>
	          <SoundMuteButton/>
          </S.VolumeIconWrapper>
          <Slider value={volume} onChange={onUpdateVolume} />
        </S.LeftIconContainer>
        <S.RightIconContainer>
          {isLive && <LiveBadge>LIVE</LiveBadge>}
          <ControllerIcon />
          <PipIcon onClick={onPip} />
          <FullScreenIcon onClick={onFullScreen} />
        </S.RightIconContainer>
      </S.BottomController>

      {isMobile && (
        <S.BottomControllerMobile>
          <S.LeftIconContainer>
            <PlayPauseButton onClick={onTogglePause}>
	            {paused ? <Pause/> : <Resume/>}
            </PlayPauseButton>
            <span>
              {formatTime(currentTime)}
              {!isLive && duration > 0 && ` / ${formatTime(duration)}`}
            </span>
          </S.LeftIconContainer>
          <S.RightIconContainer>
            {isLive && <LiveBadge>LIVE</LiveBadge>}
            <ControllerIcon />
            <PipIcon onClick={onPip} />
            <FullScreenIcon onClick={onFullScreen} />
          </S.RightIconContainer>
        </S.BottomControllerMobile>
      )}
    </>
  );
};

const PlayPauseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: inherit;
`;

const ControllerIcon = styled(Controller)`
  &:hover {
    cursor: pointer;
  }
`;

const PipIcon = styled(Pip)`
  &:hover {
    cursor: pointer;
  }
`;

const FullScreenIcon = styled(FullScreen)`
  &:hover {
    cursor: pointer;
  }
`

const FrontMatter = styled.span`
  vertical-align: baseline;
`;

const SeekbarContainer = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 11;
`;

const SeekbarProgress = styled.div<{ $progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: ${({ theme }) => theme.colors.primary.normal};
  pointer-events: none;
`;

const SeekbarInput = styled.input`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 16px;
  margin: 0;
  opacity: 0;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const LiveBadge = styled.div`
  padding: 4px 8px;
  background: #ff0000;
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 4px;
  letter-spacing: 0.5px;
`;