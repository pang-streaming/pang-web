import { useQuery } from '@tanstack/react-query';
import { fetchMyInfo, fetchStreamStatus } from '@/features/stream/api';

export const useMyInfo = () => {
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useStreamStatus = (streamKey: string | null, isLoadingKey: boolean) => {
  return useQuery({
    queryKey: ["streamStatus"],
    queryFn: fetchStreamStatus,
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
    enabled: !isLoadingKey && !!streamKey,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
