import api from "@/api/api";
import { DeliveryStatus, GiftResponse } from "./model/type";

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
    const res = await api.get('/market/received-gifts');
    return res.data;
  }

  interface UpdateGiftInfoProps {
    purchaseId: string,
    address: string,
    deliveryStatus: DeliveryStatus
  }

  export const updateGiftInfo = async ({purchaseId,address,deliveryStatus}:UpdateGiftInfoProps) => {
    console.log("updateGiftInfo API 호출:", {
      purchaseId,
      address,
      deliveryStatus
    });
    
    const res = await api.put('/market/gift',{
      purchaseId: purchaseId,
      address: address,
      deliveryStatus: deliveryStatus
    });
    
    console.log("updateGiftInfo API 응답:", res.data);
    return res.data;
  }