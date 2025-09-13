import { useRef, useState } from "react";
import Pause from "@/app/assets/pause.svg?react";
import { VideoControls } from "./video-controlls";
import { useHlsPlayer } from "@/entities/stream/model/useHlsPlayer";
import * as V from "@/entities/video/model/index";
import * as S from "../style";

interface VideoPlayerProps {
  streamUrl?: string;
}

export const VideoPlayer = ({ streamUrl }: VideoPlayerProps) => {
  const [hoverRef, hover] = V.useHover<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { volume, muted, updateVolume, toggleMuted } = V.useVolume(videoRef);
  const [pause, setPause] = useState(false);

  const { handleFullScreen } = V.useFullScreen(containerRef);
  const videoReady = V.useVideoReady(videoRef);
  const { handlePip } = V.usePip(videoRef, videoReady);
  const isMobile = V.useIsMobile();

  useHlsPlayer(videoRef, streamUrl);

  const handlePause = () => {
    setPause(!pause);
  };

  return (
    <S.VideoContainer ref={hoverRef}>
      <S.VideoWrapperInner>
        {streamUrl && (
          <S.VideoOverlayArea>
            <S.Video
              ref={videoRef}
              type="application/vnd.apple.mpegurl"
              autoPlay
              muted={muted}
              onClick={handlePause}
            />
          </S.VideoOverlayArea>
        )}
        {pause && (
          <S.VideoCenterController>
            <Pause/>
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
