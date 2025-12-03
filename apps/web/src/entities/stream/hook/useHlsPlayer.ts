import { RefObject, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

const convertToLocalHlsUrl = (url: string): string => {
  if (!url.endsWith("playlist.m3u8")) return url;

  const match = url.match(/^https?:\/\/[^/]+\/(.+)$/);
  if (!match) return url;

  const path = match[1];
  return `http://localhost:25137/hls/${path}`;
};

const checkPlayerRunning = async (): Promise<boolean> => {
  try {
    await fetch("http://localhost:25137/ping", {
      method: "GET",
      signal: AbortSignal.timeout(1000),
    });
    return true;
  } catch {
    return false;
  }
};

export const useHlsPlayer = (
  videoRef: RefObject<HTMLVideoElement | null>,
  streamUrl?: string,
  isLive: boolean = true
) => {
  const playerRef = useRef<Player | null>(null);
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string | undefined>(undefined);

  // streamUrl이 변경되면 플레이어 체크 후 URL 설정
  useEffect(() => {
    if (!streamUrl) return;

    // 라이브일 때만 플레이어 체크 후 localhost 변환
    if (isLive && streamUrl.endsWith("playlist.m3u8")) {
      const initStreamUrl = async () => {
        const isPlayerRunning = await checkPlayerRunning();
        if (isPlayerRunning) {
          setCurrentStreamUrl(convertToLocalHlsUrl(streamUrl));
        } else {
          setCurrentStreamUrl(streamUrl);
        }
      };
      initStreamUrl();
    } else {
      // VOD는 변환 없이 그대로 사용
      setCurrentStreamUrl(streamUrl);
    }
  }, [streamUrl, isLive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentStreamUrl) return;

    // 기존 player 인스턴스 정리
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    // video.js 플레이어 초기화 (커스텀 UI 사용을 위해 controls: false)
    const player = videojs(video, {
      controls: false,
      autoplay: true,
      muted: true,
      preload: "auto",
      fluid: false,
      liveui: isLive,
      html5: {
        vhs: {
          overrideNative: true,
          enableLowInitialPlaylist: !isLive,
          smoothQualityChange: true,
          fastQualityChange: true,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      },
      sources: [
        {
          src: currentStreamUrl,
          type: "application/x-mpegURL",
        },
      ],
    });

    playerRef.current = player;

    player.ready(() => {
      // VOD일 때 0초부터 시작
      if (!isLive) {
        player.currentTime(0);
      }
      player.play()?.catch((err) => {
        console.warn("Auto-play blocked:", err);
      });
    });

    player.on("error", () => {
      const error = player.error();
      console.error("Video.js error:", error);

      // 네트워크 에러 시 재시도
      if (error?.code === 2) {
        setTimeout(() => {
          player.src({
            src: currentStreamUrl,
            type: "application/x-mpegURL",
          });
          player.play()?.catch(() => {});
        }, 1000);
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [currentStreamUrl, isLive]);

  return {
    streamUrl: currentStreamUrl,
    setStreamUrl: setCurrentStreamUrl,
    player: playerRef.current,
  };
};
