import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ProductItem,
  ProductDetailData,
  TopFiveProduct,
  CategoryByProductResponse,
} from "@/pages/market/model/product";
import {
  buyProduct,
  fetchCategoryByProducts,
  fetchMarketItemDetail,
  fetchMarketItems,
  fetchTopFiveItem,
  likeProduct,
} from "@/features/market/api";
import { Product } from "@/entities/product/model/type";

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
export const useLikeProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId }: { productId: string }) => likeProduct({ productId }),
    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["productDetail", productId] });
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousDetail = queryClient.getQueryData<ProductDetailData>(["productDetail", productId]);
      const previousProducts = queryClient.getQueryData<ProductItem[]>(["products"]);

      if (previousDetail) {
        queryClient.setQueryData<ProductDetailData>(["productDetail", productId], {
          ...previousDetail,
          isLiked: !previousDetail.isLiked,
          likes: previousDetail.isLiked ? previousDetail.likes - 1 : previousDetail.likes + 1,
        });
      }

      if (previousProducts) {
        const updatedProducts = previousProducts.map(product => 
          product.id === productId 
            ? { 
                ...product, 
                isLiked: !product.isLiked,
              }
            : product
        );
        queryClient.setQueryData<ProductItem[]>(["products"], updatedProducts);
      }

      return { previousDetail, previousProducts };
    },
    onError: (err, { productId }, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData<ProductDetailData>(["productDetail", productId], context.previousDetail);
      }
      if (context?.previousProducts) {
        queryClient.setQueryData<ProductItem[]>(["products"], context.previousProducts);
      }
      console.error("좋아요 처리 중 오류가 발생했습니다:", err);
    },
    onSettled: (_, __, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ["productDetail", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useBuyProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, address, email }: { productId: string; address: string; email: string }) => 
      buyProduct(productId, address, email),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["productDetail", variables.productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["purchaseHistory"] });
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });
};
