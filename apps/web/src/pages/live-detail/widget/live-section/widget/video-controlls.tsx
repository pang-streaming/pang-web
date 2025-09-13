import { useEffect, useState } from "react";
import Pause from "@/app/assets/pause.svg?react";
import Resume from "@/app/assets/resume.svg?react";
import Sound from "@/app/assets/sound.svg?react";
import Muted from "@/app/assets/sound-muted.svg?react";
import Controller from "@/app/assets/controller.svg?react";
import Pip from "@/app/assets/pip.svg?react";
import FullScreen from "@/app/assets/full-screen.svg?react";
import { CustomSlider } from "../../chatting-section/ui/custom-slider";
import * as S from '../style';

interface VideoControlsProps {
  isVisible: boolean;
  isMobile: boolean;
  pause: boolean;
  volume: number;
  muted: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onPause: () => void;
  onToggleMuted: () => void;
  onUpdateVolume: (volume: number) => void;
  onPip: () => void;
  onFullScreen: () => void;
}

export const VideoControls = ({
  isVisible,
  isMobile,
  pause,
  volume,
  muted,
  videoRef,
  onPause,
  onToggleMuted,
  onUpdateVolume,
  onPip,
  onFullScreen,
}: VideoControlsProps) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, [videoRef]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
	
	const SoundMuteButton = muted || volume === 0 ? Muted : Sound;

  return (
    <>
      <S.BottomController isVisible={isVisible}>
        <S.LeftIconContainer>
	        {pause ? <Pause/> : <Resume/>}
	        {formatTime(currentTime)}
	        <SoundMuteButton onClick={onToggleMuted}/>
          <CustomSlider value={volume} onChange={onUpdateVolume} />
        </S.LeftIconContainer>
        <S.RightIconContainer>
          <Controller />
          <Pip onClick={onPip} />
          <FullScreen onClick={onFullScreen} />
        </S.RightIconContainer>
      </S.BottomController>

      {isMobile && (
        <S.BottomControllerMobile>
          <S.LeftIconContainer>
	          {pause ? <Pause/> : <Resume/>}
            <span>{formatTime(currentTime)}</span>
          </S.LeftIconContainer>
          <S.RightIconContainer>
            <Controller />
            <Pip onClick={onPip} />
            <FullScreen onClick={onFullScreen} />
          </S.RightIconContainer>
        </S.BottomControllerMobile>
      )}
    </>
  );
};
