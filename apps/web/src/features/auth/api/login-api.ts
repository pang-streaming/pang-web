import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/shared/lib/query-client";


export const loginUser = async (id: string, password: string) => {
  const res = await api.post("/auth/login", { id, password });
  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("accessToken");
  // 모든 쿼리 캐시 초기화
  queryClient.clear();
}