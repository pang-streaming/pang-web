import { fetchOtherUserInfo } from "@/entities/user/api/api";
import { useQuery } from "@tanstack/react-query";

export const useUsernameToInfo = ({ username }: { username: string }) => {
    return useQuery({
      queryKey: ["otherUserInfo", username],
      queryFn: async () => await fetchOtherUserInfo({ username }),
      enabled: !!username, 
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,

    });
  };