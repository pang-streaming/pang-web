import { RefObject, useCallback } from "react";

export function usePip(videoRef: RefObject<HTMLVideoElement | null>, isReady: boolean) {
  const handlePip = useCallback(async () => {
    try {
      if (!videoRef.current || !isReady) return;

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch {
      // noop
    }
  }, [videoRef, isReady]);

  return { handlePip };
}


