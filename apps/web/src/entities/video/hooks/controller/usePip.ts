import { RefObject, useCallback } from "react";

export function usePip(videoRef: RefObject<HTMLVideoElement | null>) {
  const handlePip = useCallback(async () => {
    try {
      const video = videoRef.current;
      if (!video) {
        console.error("비디오 요소를 찾을 수 없습니다.");
        return;
      }

      if (!document.pictureInPictureEnabled) {
        alert("이 브라우저는 PiP를 지원하지 않습니다.");
        console.error("PIP not supported");
        return;
      }

      if (video.readyState < 2) {
        alert("비디오가 아직 로드되지 않았습니다.");
        console.error("비디오 readyState:", video.readyState);
        return;
      }

      if (video.disablePictureInPicture) {
        alert("이 비디오는 PiP가 비활성화되어 있습니다.");
        console.error("PIP disabled on video element");
        return;
      }

      if (document.pictureInPictureElement) {
        console.log("PIP 종료");
        await document.exitPictureInPicture();
      } else {
        console.log("PIP 시작");
        
        if (video.paused) {
          console.log("비디오 재생 중...");
          await video.play();
        }
        
        await video.requestPictureInPicture();
        console.log("PIP 활성화 성공");
      }
    } catch (err: any) {
      console.error("PiP 실패:", err);
      console.error("에러 타입:", err.name);
      console.error("에러 메시지:", err.message);
      
      if (err.name === "InvalidStateError") {
        alert("비디오가 재생 중이지 않습니다. 비디오를 재생한 후 다시 시도해주세요.");
      } else if (err.name === "NotSupportedError") {
        alert("이 비디오 형식은 PiP를 지원하지 않습니다.");
      } else {
        alert(`PiP 실행 중 오류가 발생했습니다: ${err.message}`);
      }
    }
  }, [videoRef]);

  return { handlePip };
}
