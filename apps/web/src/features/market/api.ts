import api from "@/api/api";
import {
  ProductListResponse,
  ProductItem,
  ProductDetailResponse,
  TopFiveProduct,
  CategoryByProductResponse,
} from "@/pages/market/model/product";

export const sendLike = async (productId: string): Promise<ProductItem> => {
  const res = await api.post("/market/like", { productId });
  return res.data.data; 
};

export const fetchMarketItems = async (): Promise<ProductItem[]> => {
  const res = await api.get<ProductListResponse>("/market/items");
  return res.data.data.content;
};

export const fetchMarketItemDetail = async (
  productId: string
): Promise<ProductDetailResponse> => {
  const res = await api.get<ProductDetailResponse>(`/market/${productId}`);
  return res.data;
};

export const fetchTopFiveItem = async (): Promise<TopFiveProduct[]> => {
  const res = await api.get("/market/top5");
  return res.data.data;
};


export const fetchCategoryByProducts = async (
  category: string
): Promise<CategoryByProductResponse> => {
  const res = await api.get(`/market?category=${category}`);
  return res.data;
};