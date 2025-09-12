import { useEffect, useState } from "react";
import { LiveStreamDetailData } from "./type";
import { fetchLiveStreamDetail } from "../api";

export function useStreamDetail(streamId?: string) {
  const [streamData, setStreamData] = useState<LiveStreamDetailData | undefined>();

  useEffect(() => {
    if (!streamId) return;
    const fetchLiveStreamData = async () => {
      try {
        const res = await fetchLiveStreamDetail(streamId);
        setStreamData(res.data.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("스트림 불러오는중 실패", err);
      }
    };
    fetchLiveStreamData();
  }, [streamId]);

  return { streamData };
}


