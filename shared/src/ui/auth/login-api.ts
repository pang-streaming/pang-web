import api from "../header/api";
import { tokenStorage } from "../../lib/cookie";

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

export const loginUser = async (id: string, password: string): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", { id, password });
  return res.data;
};

export const logoutUser = () => {
  tokenStorage.clearAll();
  localStorage.removeItem("accessToken");
};

