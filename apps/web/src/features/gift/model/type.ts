export type DeliveryStatus = 'PREPARING' | 'SHIPPING' | 'DELIVERED';

export interface Gift {
  purchaseId: string;
  productId: string;
  imageUrl: string;
  productName: string;
  price: number;
  fileUrl: string;
  buyerId: string;
  buyerName: string;
  address: string;
  email: string;
  deliveryStatus: DeliveryStatus;
  createdAt: string; 
}

export interface GiftResponse {
  status: string; 
  message: string;
  data: Gift[];
  timestamp: string;
}