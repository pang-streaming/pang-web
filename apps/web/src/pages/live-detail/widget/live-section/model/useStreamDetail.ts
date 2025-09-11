import { useEffect, useState } from "react";
import { fetchLiveStreamDetail } from "@/entities/stream/api";
import type { LiveStreamDetailData } from "@/entities/stream/model/type";

export function useStreamDetail(streamId?: string) {
  const [streamData, setStreamData] = useState<LiveStreamDetailData | undefined>(undefined);

  useEffect(() => {
    if (!streamId) return;
    const fetchData = async () => {
      try {
        const res = await fetchLiveStreamDetail(streamId);
        setStreamData(res.data.data);
      } catch (err) {
        console.error("스트림 불러오는중 실패", err);
        setStreamData(undefined);
      }
    };
    fetchData();
  }, [streamId]);

  return { streamData };
}


