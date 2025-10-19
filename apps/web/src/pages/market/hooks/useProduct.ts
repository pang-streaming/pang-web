import { useQuery } from "@tanstack/react-query";
import {
  ProductItem,
  ProductDetailData,
  TopFiveProduct,
  CategoryByProductResponse,
} from "@/pages/market/model/product";
import {
  fetchCategoryByProducts,
  fetchMarketItemDetail,
  fetchMarketItems,
  fetchTopFiveItem,
} from "@/features/market/api";

export const useProduct = () => {
  return useQuery<ProductItem[]>({
    queryKey: ["products"],
    queryFn: fetchMarketItems,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};

export const useProductDetail = (productId: string) => {
  return useQuery<ProductDetailData>({
    queryKey: ["productDetail", productId],
    queryFn: async () => {
      const res = await fetchMarketItemDetail(productId);
      return res.data;
    },
    enabled: !!productId,
    refetchOnWindowFocus: false,
  });
};

export const useTopFiveProduct = () => {
  return useQuery<TopFiveProduct[]>({
    queryKey: ["topFiveProducts"],
    queryFn: fetchTopFiveItem,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};


export const useCategoryByProduct = (category: string) => {
  return useQuery<CategoryByProductResponse>({
    queryKey: ["categoryByProduct", category],
    queryFn: () => fetchCategoryByProducts(category),
    enabled: !!category, 
    refetchOnWindowFocus: false,
  });
};

