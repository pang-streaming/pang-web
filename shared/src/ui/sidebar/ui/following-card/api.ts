import { useQuery } from "@tanstack/react-query";
import { api } from "../../../header/api";



export const fetchMyFollowing = async (username: string): Promise<FollowResponse> => {
    const res = await api.get("/follow/following", {params : { username }})
    return res.data;
}



export interface Follow {
    image: string,
    nickname: string,
    follower: number
    username: string,
}

export interface FollowResponse {
    status: string,
    message : string,
    data: Follow[];
    timestamp: string
}
export const useFollowing = (username: string) => {
    return useQuery<FollowResponse>({
      queryKey: ["following", username],
      queryFn: () => fetchMyFollowing(username),
      staleTime: 1000 * 60, 
      refetchOnWindowFocus: false,
    });
  };