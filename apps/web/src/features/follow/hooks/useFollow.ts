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
    onMutate: async ({ username, isFollowing }) => {
      await queryClient.cancelQueries({ queryKey: ["otherUserInfo", username] });
      await queryClient.cancelQueries({ queryKey: ["myFollowing"] });
      await queryClient.cancelQueries({ queryKey: ["myFollower", username] });

      const previousUserInfo = queryClient.getQueryData(["otherUserInfo", username]);
      const previousFollowing = queryClient.getQueryData(["myFollowing"]);
      const previousFollower = queryClient.getQueryData(["myFollower", username]);

      if (previousUserInfo) {
        queryClient.setQueryData(["otherUserInfo", username], {
          ...previousUserInfo,
          data: {
            ...(previousUserInfo as any).data,
            isFollowed: !isFollowing,
            followerCount: isFollowing 
              ? (previousUserInfo as any).data.followerCount - 1 
              : (previousUserInfo as any).data.followerCount + 1,
          }
        });
      }

      if (previousFollower) {
        queryClient.setQueryData(["myFollower", username], {
          ...previousFollower,
          data: isFollowing 
            ? (previousFollower as FollowResponse).data.filter((follower: any) => follower.username !== username)
            : [...(previousFollower as FollowResponse).data, { username }]
        });
      }

      return { previousUserInfo, previousFollowing, previousFollower };
    },
    onError: (err, variables, context) => {
      if (variables?.username) {
        if (context?.previousUserInfo) {
          queryClient.setQueryData(["otherUserInfo", variables.username], context.previousUserInfo);
        }
        if (context?.previousFollowing) {
          queryClient.setQueryData(["myFollowing"], context.previousFollowing);
        }
        if (context?.previousFollower) {
          queryClient.setQueryData(["myFollower", variables.username], context.previousFollower);
        }
      }
      console.error("팔로우 처리 중 오류가 발생했습니다:", err);
    },
    onSettled: (_, variables) => {
      // 성공/실패 관계없이 서버 데이터로 동기화
      if (variables && 'username' in variables) {
        queryClient.invalidateQueries({ queryKey: ["otherUserInfo", variables.username] });
        queryClient.invalidateQueries({ queryKey: ["myFollowing"] });
        queryClient.invalidateQueries({ queryKey: ["myFollower", variables.username] });
      }
    },
  });
};