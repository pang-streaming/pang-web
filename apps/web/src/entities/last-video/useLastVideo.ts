import { useQuery } from "@tanstack/react-query"
import { LastVideo, LastVideoResponse } from "./type"
import { fetchLastVideo } from "./api"

export const useLastVideo = (username?: string) => {
  return useQuery<LastVideoResponse>({
    queryKey: ["lastVideo", username],
    queryFn: () => fetchLastVideo(username!),
    enabled: !!username,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};
