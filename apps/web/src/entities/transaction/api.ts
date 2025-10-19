import api from "@/api/api";
import type { BalanceResponse } from "./model/type";

export const fetchTransaction = async (): Promise<BalanceResponse> => {
  const res = await api.get("/cash");
  return res.data;
}