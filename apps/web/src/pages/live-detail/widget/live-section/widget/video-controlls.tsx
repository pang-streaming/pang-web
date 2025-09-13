import { useEffect, useState, useRef } from "react";
import Pause from "@/app/assets/pause.svg";
import Resume from "@/app/assets/resume.svg";
import Sound from "@/app/assets/sound.svg";
import Muted from "@/app/assets/sound-muted.svg";
import Controller from "@/app/assets/controller.svg";
import Pip from "@/app/assets/pip.svg";
import FullScreen from "@/app/assets/full-screen.svg";
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

  return (
    <>
      <S.BottomController $isVisible={isVisible}>
        <S.LeftIconContainer>
          <img src={pause ? Pause : Resume} alt="" />
          <span>{formatTime(currentTime)}</span>
          <img
            src={muted || volume === 0 ? Muted : Sound}
            alt=""
            onClick={onToggleMuted}
          />
          <CustomSlider value={volume} onChange={onUpdateVolume} />
        </S.LeftIconContainer>
        <S.RightIconContainer>
          <img src={Controller} alt="" />
          <img src={Pip} alt="" onClick={onPip} />
          <img src={FullScreen} alt="" onClick={onFullScreen} />
        </S.RightIconContainer>
      </S.BottomController>

      {isMobile && (
        <S.BottomControllerMobile>
          <S.LeftIconContainer>
            <img src={pause ? Pause : Resume} alt="" />
            <span>{formatTime(currentTime)}</span>
          </S.LeftIconContainer>
          <S.RightIconContainer>
            <img src={Controller} alt="" />
            <img src={Pip} alt="" onClick={onPip} />
            <img src={FullScreen} alt="" onClick={onFullScreen} />
          </S.RightIconContainer>
        </S.BottomControllerMobile>
      )}
    </>
  );
};
