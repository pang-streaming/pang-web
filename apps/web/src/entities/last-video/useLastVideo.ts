import { useQuery } from "@tanstack/react-query"
import { LastVideo, LastVideoResponse } from "./type"
import { fetchAllLastVideo, fetchFollowingLastVideo, fetchLastVideoByUsername } from "./api"

export const useLastVideoByUsername = (username?: string) => {
  return useQuery<LastVideoResponse>({
    queryKey: ["lastVideo", username],
    queryFn: () => fetchLastVideoByUsername(username!),
    enabled: !!username,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};

export const useAllLastVideo = () => {
  return useQuery<LastVideoResponse>({
    queryKey: ["alllastVideo"],
    queryFn: () => fetchAllLastVideo(),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};

export const useFollowingLastVideo = () => {
    return useQuery<LastVideoResponse>({
      queryKey: ["followingLastVideo"],
      queryFn: () => fetchFollowingLastVideo(),
      staleTime: 1000 * 60 * 1,
      refetchOnWindowFocus: false,
    });
  };
  