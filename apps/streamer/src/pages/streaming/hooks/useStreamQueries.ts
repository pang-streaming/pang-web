import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchMyInfo, fetchStreamStatus, createStreamKey } from '@/features/stream/api';

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

export const useStreamKeyInitializer = (
  myInfo: any,
  isLoadingMyInfo: boolean,
  setStreamKey: (key: string) => void,
  setWhipUrl: (url: string) => void,
  setIsLoadingKey: (loading: boolean) => void
) => {
  useEffect(() => {
    if (isLoadingMyInfo || !myInfo?.data) {
      return;
    }

    const initializeStreamKey = async () => {
      try {
        setIsLoadingKey(true);
        const createResponse = await createStreamKey();
        setStreamKey(createResponse.data.key);
        setWhipUrl(createResponse.data.webRtcUrl);
      } catch (error: any) {
        console.error("스트림 키 처리 실패:", error);
        alert("스트림 키 처리 중 오류가 발생했습니다.");
      } finally {
        setIsLoadingKey(false);
      }
    };

    initializeStreamKey();
  }, [myInfo, isLoadingMyInfo, setStreamKey, setWhipUrl, setIsLoadingKey]);
};
