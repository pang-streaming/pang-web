import { useEffect, useState } from "react";
import { fetchVideos } from "@/entities/video/api/api";
import { VideoItem } from "@/entities/video/model/type";

export const useVideoList = () => {
  const [liveVideos, setLiveVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchVideos();
        setLiveVideos(res);
        console.log("불러온 비디오", res);
      } catch (e) {
        console.error("비디오 가져오기 실패", e);
        setError("비디오를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  return {
    liveVideos,
    isLoading,
    error,
    refetch: () => {
      const loadVideos = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const res = await fetchVideos();
          setLiveVideos(res);
          console.log("불러온 비디오", res);
        } catch (e) {
          console.error("비디오 가져오기 실패", e);
          setError("비디오를 불러오는데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };
      loadVideos();
    }
  };
};;