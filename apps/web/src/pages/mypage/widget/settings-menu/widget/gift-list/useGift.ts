
import { fetchGift, sendGift } from "@/features/gift/api";
import { GiftResponse } from "@/features/gift/model/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGifts = () => {
  return useQuery<GiftResponse>({
    queryKey: ["gifts"],
    queryFn: fetchGift,
    staleTime: 1000 * 60, 
    refetchOnWindowFocus: false,
  });
};


export const useSendGift = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ productId, username }: { productId: string; username: string }) =>
        sendGift(productId, username),
      onSuccess: (_, { username }) => {
        alert(`${username}님에게 선물을 보냈어요!`);
        queryClient.invalidateQueries({ queryKey: ["gifts"] });
      },
      onError: (error: any) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;
  
        if (status === 409) {
          alert("이미 해당 유저에게 선물을 보냈습니다!");
        } else if (status === 404) {
          alert("존재하지 않는 사용자입니다!");
        } else if (status === 400) {
          alert("잘못된 요청이에요. 다시 시도해주세요!");
        } else {
          alert("선물 전송 중 오류가 발생했습니다.");
        }
  
        console.error("Gift send error:", message || error);
      },
    });
  };