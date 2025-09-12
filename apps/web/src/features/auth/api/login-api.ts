import api from "@/api/api";
import { useNavigate } from "react-router-dom";


export const loginUser = async (id: string, password: string) => {
  const res = await api.post("/auth/login", { id, password });
  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("accessToken");
}