import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMarketItems,
  fetchMarketItemDetail,
  fetchTopFiveItem,
  likeProduct,
  buyProduct,
  fetchCategoryByProducts,
} from "../api";
import { ProductDetailData, TopFiveProduct } from "@/pages/market/model/product";

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetchMarketItems();
      return res;
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useCategoryByProduct = (category: string) => {
  return useQuery({
    queryKey: ["categoryByProduct", category],
    queryFn: async () => {
      const res = await fetchCategoryByProducts(category);
      return res;
    },
    enabled: !!category,
    staleTime: 1000 * 60,
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
    queryFn: async () => {
      const res = await fetchTopFiveItem();
      return res;
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useLikeProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeProduct,
    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["productDetail", productId] });

      const previousProduct = queryClient.getQueryData<ProductDetailData>([
        "productDetail",
        productId,
      ]);

      if (previousProduct) {
        queryClient.setQueryData<ProductDetailData>(
          ["productDetail", productId],
          {
            ...previousProduct,
            isLiked: !previousProduct.isLiked,
            likes: previousProduct.isLiked
              ? previousProduct.likes - 1
              : previousProduct.likes + 1,
          }
        );
      }

      return { previousProduct };
    },
    onError: (err, { productId }, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ["productDetail", productId],
          context.previousProduct
        );
      }
      console.error("좋아요 처리 중 오류가 발생했습니다:", err);
    },
    onSettled: (_, __, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ["productDetail", productId] });
    },
  });
};

export const useBuyProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, address, email }: { productId: string; address: string; email: string }) =>
      buyProduct(productId, address, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productDetail"] });
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
  });
};
