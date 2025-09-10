import { RefObject, useCallback } from "react";

export function useFullScreen(targetContainerRef: RefObject<HTMLElement | null>) {
  const handleFullScreen = useCallback(() => {
    const container = targetContainerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen().catch(() => {});
    }
  }, [targetContainerRef]);

  return { handleFullScreen };
}


