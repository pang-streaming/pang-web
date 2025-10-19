

import { useQuery } from "@tanstack/react-query";
import { StoreProduct, StoreProductResponse, StoreResponse } from "./type";
import { fetchStore, fetchStoreProducts, } from "./api";

export const useStore = () => {
  return useQuery<StoreResponse>({
    queryKey: ["stores"],
    queryFn: fetchStore,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });
};

export const useStoreProduct = (storeId: string) => {
  console.log("🎯 useStoreProduct 호출 - storeId:", storeId);
  
  return useQuery<StoreProductResponse>({
    queryKey: ["storeProduct", storeId],
    queryFn: async () => {
      console.log("queryFn 실행 중 - storeId:", storeId);
      return fetchStoreProducts(storeId!);
    },
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
