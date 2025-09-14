import { RefObject, useEffect, useState } from "react";

export function useVideoReady(videoRef: RefObject<HTMLVideoElement | null>) {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoaded = () => setVideoReady(true);
    video.addEventListener("loadedmetadata", handleLoaded);
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, [videoRef]);

  return videoReady;
}


