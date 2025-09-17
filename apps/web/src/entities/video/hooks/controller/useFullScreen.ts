import { RefObject, useCallback } from "react";

export function useFullScreen(targetContainerRef: RefObject<HTMLElement | null>) {
  const handleFullScreen = useCallback(async () => {
    const container = targetContainerRef.current;
    if (!container) {
      console.error("Container element not found for fullscreen");
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        console.log("Exited fullscreen");
      } else {
        await container.requestFullscreen();
        console.log("Entered fullscreen");
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      
      // Fallback for older browsers
      if (container.requestFullscreen) {
        try {
          await container.requestFullscreen();
        } catch (fallbackError) {
          console.error("Fallback fullscreen failed:", fallbackError);
        }
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      } else if ((container as any).mozRequestFullScreen) {
        (container as any).mozRequestFullScreen();
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen();
      } else {
        console.error("Fullscreen API not supported");
      }
    }
  }, [targetContainerRef]);

  return { handleFullScreen };
}
