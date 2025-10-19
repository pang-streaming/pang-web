import { fetchTransaction } from "../api";
import { useQuery } from "@tanstack/react-query";
import type { BalanceResponse } from "../model/type";


export const useTransaction = () => {
  return useQuery<BalanceResponse>({
    queryKey: ["transaction"],
    queryFn: fetchTransaction,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};