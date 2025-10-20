import api from "@/api/api"
import { Category, CategoryLiveResponse } from "../model/category"


export const fetchCategory = async (): Promise<Category[]> => {
    const res =  await api.get("/categories");
    return (res.data?.data ?? res.data) as Category[];
}

export const fetchFilteredCategory = async () => {
    const res = await api.get('/filtered/categories');
    return res.data;
}


export const fetchCategoryLives = async (categoryId: string): Promise<CategoryLiveResponse> => {
    const res = await api.get(`/stream/category/${categoryId}`);
    console.log("fetchCategoryLives 응답:", res.data);
    return res.data;
  };
  
  export const fetchCategoryVideos = async (categoryId: string): Promise<CategoryLiveResponse> => {
    const res = await api.get(`/video/category/${categoryId}`);
    console.log("fetchCategoryVideos 응답:", res.data);
    return res.data;
  };
  