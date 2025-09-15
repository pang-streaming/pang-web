import api from "@/api/api";

export interface CardInfo {
  name: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  password: string;
  owner: string;
  phoneNumber: string;
  birth: string;
}

export interface AddCardRequest {
  name: string;
  phone: string;
  cardNumber: string;
  expiredYear: string;
  expiredMonth: string;
  birth: string;
  cardPassword: string;
}

export interface CardListItem {
  cardId: string;
  provider: string;
  name: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface ProcessPaymentRequest {
  cardId: string;
  amount: number;
}

export interface ProcessPaymentResponse {
  transactionId: string;
  status: string;
  amount: number;
}

export const paymentApi = {
  addCard: async (cardInfo: CardInfo): Promise<ApiResponse<null>> => {
    const requestData: AddCardRequest = {
      name: cardInfo.name,
      phone: cardInfo.phoneNumber,
      cardNumber: cardInfo.cardNumber,
      expiredYear: cardInfo.expiryYear,
      expiredMonth: cardInfo.expiryMonth,
      birth: cardInfo.birth,
      cardPassword: cardInfo.password,
    };
    const response = await api.post("/payment/card", requestData);
    return response.data;
  },

  getCards: async (): Promise<ApiResponse<CardListItem[]>> => {
    const response = await api.get("/payment/card");
    return response.data;
  },

  processPayment: async (cardId: string, amount: number): Promise<ApiResponse<ProcessPaymentResponse>> => {
    const requestData: ProcessPaymentRequest = {
      cardId,
      amount,
    };
    const response = await api.post("/cash/payment", requestData);
    return response.data;
  },
};