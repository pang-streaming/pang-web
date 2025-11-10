import { useRef, useState } from "react";
import Pause from "@/app/assets/pause.svg?react";
import { VideoControls } from "./video-controlls";
import { useHlsPlayer } from "@/entities/stream/hook/useHlsPlayer";
import * as V from "@/entities/video/model/index";
import * as S from "../style";
import { useHover, useVolume, useFullScreen } from "@/entities/video/model";

interface VideoPlayerProps {
  streamUrl?: string;
  isMobile: boolean;
	url:  string;
}

export const VideoPlayer = ({ streamUrl, isMobile, url }: VideoPlayerProps) => {
  const [hoverRef, hover] = useHover<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { volume, muted, updateVolume, toggleMuted } = useVolume(videoRef);
  const [pause, setPause] = useState(false);
  const { handleFullScreen } = useFullScreen(containerRef);
  const { handlePip } = V.usePip(videoRef);
  useHlsPlayer(videoRef, streamUrl);  

  const handlePause = () => {
    setPause(!pause);
  };

  return (
    <S.VideoContainer ref={hoverRef}>
      <S.VideoWrapperInner ref={containerRef}>
        {streamUrl && (
          <S.VideoOverlayArea>
            <S.Video
	            // src={"cf392de3fca5ea8f0991bb45c19a7167"}
	            src={url}
              muted={muted}
	            autoplay={true}
	            controls={false}
            />
          </S.VideoOverlayArea>
        )}
        {pause && (
          <S.VideoCenterController>
            <Pause />
          </S.VideoCenterController>
        )}
        <VideoControls
          isVisible={hover}
          isMobile={isMobile}
          pause={pause}
          volume={volume}
          muted={muted}
          videoRef={videoRef}
          onPause={handlePause}
          onToggleMuted={toggleMuted}
          onUpdateVolume={updateVolume}
          onPip={handlePip}
          onFullScreen={handleFullScreen}
        />
      </S.VideoWrapperInner>
    </S.VideoContainer>
  );
};
