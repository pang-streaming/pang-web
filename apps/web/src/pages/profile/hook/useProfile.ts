import { fetchOtherUserInfo } from "@/entities/user/api/api";
import { useQuery } from "@tanstack/react-query";
import { fetchPostList } from "@/features/community/api/api";

export const useUsernameToInfo = ({ username }: { username: string }) => {
    return useQuery({
      queryKey: ["otherUserInfo", username],
      queryFn: async () => await fetchOtherUserInfo({ username }),
      enabled: !!username, 
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,

    });
  };

interface UsePostListParams {
  communityId: number;
  page?: number;
  size?: number;
  sort?: string[];
  filter?: "ALL" | "OWNER_ONLY" | "NON_OWNER_ONLY";
}

export const usePostList = (params: UsePostListParams) => {
  return useQuery({
    queryKey: ["postList", params.communityId, params.filter, params.page, params.size, params.sort],
    queryFn: () =>
      fetchPostList(params.communityId, {
        page: params.page,
        size: params.size,
        sort: params.sort,
        filter: params.filter,
      }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};