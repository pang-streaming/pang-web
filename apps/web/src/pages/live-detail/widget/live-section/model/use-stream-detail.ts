import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLiveStreamDetail } from "@/entities/stream/api";
import type { LiveStreamDetailData } from "@/entities/stream/model/type";

export function useStreamDetail(streamId?: string) {
  const [streamData, setStreamData] = useState<LiveStreamDetailData | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!streamId) {
    //   alert("스트림 ID가 유효하지 않습니다.");
    //   navigate("/");
    //   return;
    // }

    // const fetchData = async () => {
    //   setIsLoading(true);
    //   try {
    //     const res = await fetchLiveStreamDetail(streamId);
    //     setStreamData(res.data.data);
    //   } catch (err) {
    //     console.error("스트림 불러오는중 실패", err);
    //     alert("스트림 정보를 불러올 수 없습니다.");
    //     navigate("/");
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchData();
  }, [streamId, navigate]);

  return { streamData, isLoading };
}
