import api from "@/api/api"
import { StoreResponse, StoreProductResponse } from "./type";

export const fetchStore = async (): Promise<StoreResponse> => {
    const res = await api.get("/store");
    console.log("fetchStore 응답:", res.data);
    return res.data;
}

export const fetchStoreProducts = async (storeId: string): Promise<StoreProductResponse> => {
        const res = await api.get(`/store/${storeId}`);
        return res.data;
}
