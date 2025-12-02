import { useRef, useState, useEffect, useCallback } from "react";
import Pause from "@/app/assets/pause.svg?react";
import { VideoControls } from "./video-controlls";
import { useHlsPlayer } from "@/entities/stream/hook/useHlsPlayer";
import * as V from "@/entities/video/model/index";
import * as S from "../style";
import { useHover, useVolume, useFullScreen } from "@/entities/video/model";
import { PlayerInstallModal } from "./player-install-modal";

interface VideoPlayerProps {
  streamUrl?: string;
  isMobile: boolean;
  isLive?: boolean;
}

export const VideoPlayer = ({ streamUrl, isMobile, isLive = true }: VideoPlayerProps) => {
  const [hoverRef, hover] = useHover<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { volume, muted, updateVolume, toggleMuted } = useVolume(videoRef);
  const [paused, setPaused] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const { handleFullScreen } = useFullScreen(containerRef);
  const { handlePip } = V.usePip(videoRef);
  useHlsPlayer(videoRef, streamUrl, isLive);

  useEffect(() => {
    if (!isLive) return;
    const checkAppStatus = async () => {
      try {
        await fetch("http://localhost:25137/ping", {
          method: "GET",
          signal: AbortSignal.timeout(3000),
        });
      } catch {
        // 딥링크로 앱 실행 시도
        window.location.href = "pangplayer://init";

        // 잠시 후에도 앱이 실행되지 않으면 설치 모달 표시
        setTimeout(() => {
          setShowInstallModal(true);
        }, 3000);
      }
    };

    checkAppStatus();
  }, [isLive]);

  // 비디오 재생 상태와 동기화
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setPaused(false);
    const handlePause = () => setPaused(true);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const handleTogglePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  return (
    <S.VideoContainer ref={hoverRef}>
      <S.VideoWrapperInner ref={containerRef}>
        {streamUrl && (
          <S.VideoOverlayArea>
            <S.Video
              ref={videoRef}
              muted={muted}
              autoPlay
              playsInline
            />
          </S.VideoOverlayArea>
        )}
        {paused && (
          <S.VideoCenterController onClick={handleTogglePause}>
            <Pause />
          </S.VideoCenterController>
        )}
        <VideoControls
          isVisible={hover}
          isMobile={isMobile}
          paused={paused}
          volume={volume}
          muted={muted}
          videoRef={videoRef}
          isLive={isLive}
          onTogglePause={handleTogglePause}
          onToggleMuted={toggleMuted}
          onUpdateVolume={updateVolume}
          onPip={handlePip}
          onFullScreen={handleFullScreen}
        />
      </S.VideoWrapperInner>
      <PlayerInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </S.VideoContainer>
  );
};