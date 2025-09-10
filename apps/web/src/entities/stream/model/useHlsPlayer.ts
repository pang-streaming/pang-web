import { RefObject, useEffect, useRef } from "react";
import Hls from "hls.js";

export function useHlsPlayer(videoRef: RefObject<HTMLVideoElement | null>, sourceUrl?: string) {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourceUrl) return;

    if (Hls.isSupported()) {
      if (hlsRef.current) hlsRef.current.destroy();
      const hls = new Hls({
        maxBufferLength: 10,
        maxMaxBufferLength: 30,
        lowLatencyMode: true,
        enableWorker: true,
        backBufferLength: 90,
      });
      hls.loadSource(sourceUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
        // eslint-disable-next-line no-console
        console.error("HLS error:", data);
      });
      hlsRef.current = hls;
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = sourceUrl;
    }
  }, [videoRef, sourceUrl]);
}


