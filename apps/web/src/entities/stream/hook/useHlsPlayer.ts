import { RefObject, useEffect, useRef, useState } from "react";
import Hls from "hls.js";

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
  const hlsRef = useRef<Hls | null>(null);
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

    // 기존 hls 인스턴스 정리
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari 네이티브 HLS 지원
      video.src = currentStreamUrl;
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Auto-play blocked on Safari:", err);
      });
    } else if (Hls.isSupported()) {
      const hlsConfig = isLive
        ? {
            enableWorker: true,
            lowLatencyMode: true,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: 6,
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
          }
        : {
            enableWorker: true,
            lowLatencyMode: false,
            startPosition: 0,
            maxBufferLength: 60,
            maxMaxBufferLength: 120,
          };

      const hls = new Hls(hlsConfig);

      hlsRef.current = hls;

      hls.loadSource(currentStreamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.muted = true;
        // VOD일 때 0초부터 시작
        if (!isLive) {
          video.currentTime = 0;
        }
        video.play().catch((err) => {
          console.warn("Auto-play blocked:", err);
        });
      });

      if (isLive) {
        hls.on(Hls.Events.FRAG_LOADED, () => {
          // 세그먼트 로드 후 재생이 멈춰있으면 다시 시작 (라이브만)
          if (video.paused && video.readyState >= 3) {
            video.play().catch(() => {});
          }
        });
      }

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error("HLS error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else {
      console.error("HLS is not supported in this browser");
    }
  }, [currentStreamUrl, isLive]);

  return {
    streamUrl: currentStreamUrl,
    setStreamUrl: setCurrentStreamUrl,
  };
};


// export function useHlsPlayer(videoRef: RefObject<HTMLVideoElement | null>, sourceUrl?: string) {
//   const hlsRef = useRef<Hls | null>(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || !sourceUrl) return;

//     if (Hls.isSupported()) {
//       if (hlsRef.current) hlsRef.current.destroy();
//       const hls = new Hls({
//         maxBufferLength: 10,
//         maxMaxBufferLength: 30,
//         lowLatencyMode: true,
//         enableWorker: true,
//         backBufferLength: 90,
//       });
      
//       hls.loadSource(sourceUrl);

//       hls.attachMedia(video);
      
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         console.log("HLS manifest parsed successfully");
//       });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      
//       hls.on(Hls.Events.ERROR, (event, data) => {
//         console.error("HLS error:", data);
//         if (data.fatal) {
//           switch (data.type) {
//             case Hls.ErrorTypes.NETWORK_ERROR:
//               console.error("Fatal network error encountered, trying to recover...");
//               hls.startLoad();
//               break;
//             case Hls.ErrorTypes.MEDIA_ERROR:
//               console.error("Fatal media error encountered, trying to recover...");
//               hls.recoverMediaError();
//               break;
//             default:
//               console.error("Fatal error, cannot recover");
//               hls.destroy();
//               break;
//           }
//         }
//       });
      
//       hlsRef.current = hls;
//       return () => hls.destroy();
//     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = sourceUrl;
//       video.addEventListener('error', (e) => {
//         console.error("Native HLS error:", e);
//       });
//       video.addEventListener('loadstart', () => {
//         console.log("Native HLS load started");
//       });
//     } else {
//       console.error("HLS is not supported in this browser");
//     }
//   }, [videoRef, sourceUrl]);
// }

