import api from "@/api/api";
import { GiftResponse } from "./model/type";

export const sendGift = async (
    productId: string,
    username: string
  ): Promise<GiftResponse> => {
    const res = await api.post("/market/gift", {
      productId,
      username,
    });
    return res.data;
  };


  export const fetchGift = async (): Promise<GiftResponse> => {
    const res = await api.get('/market/gifts');
    return res.data;
  }