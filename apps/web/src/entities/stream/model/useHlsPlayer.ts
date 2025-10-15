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
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest parsed successfully");
      });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Fatal network error encountered, trying to recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Fatal media error encountered, trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              console.error("Fatal error, cannot recover");
              hls.destroy();
              break;
          }
        }
      });
      
      hlsRef.current = hls;
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = sourceUrl;
      video.addEventListener('error', (e) => {
        console.error("Native HLS error:", e);
      });
      video.addEventListener('loadstart', () => {
        console.log("Native HLS load started");
      });
    } else {
      console.error("HLS is not supported in this browser");
    }
  }, [videoRef, sourceUrl]);
}

