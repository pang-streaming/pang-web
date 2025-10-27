import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyFollowing, fetchMyFollower, followingOtherUser, unfollowOtherUser } from "../api";
import type { FollowResponse } from "../model/type";

export const useMyFollowing = (username?: string) => {
  return useQuery<FollowResponse>({
    queryKey: ["myFollowing", username],
    queryFn: () => fetchMyFollowing(username!),
    enabled: !!username,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useMyFollower = (username?: string) => {
  return useQuery<FollowResponse>({
    queryKey: ["myFollower", username],
    queryFn: () => fetchMyFollower(username!),
    enabled: !!username,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, isFollowing }: { username: string; isFollowing: boolean }) => 
      isFollowing ? unfollowOtherUser(username) : followingOtherUser(username),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["otherUserInfo", variables.username] });
      queryClient.invalidateQueries({ queryKey: ["myFollowing"] });
      queryClient.invalidateQueries({ queryKey: ["myFollower"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
    onError: (err) => {
      console.error("팔로우 처리 중 오류가 발생했습니다:", err);
    },
  });
};