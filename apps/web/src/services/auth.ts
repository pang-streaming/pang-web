import api from "../api/api";

export const signup = async (userInfo: any) => {
  const res = await api.post("/auth/register", userInfo);
  return res.data;
};

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (
    id: string,
    password: string
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", { id, password });

  const { accessToken, refreshToken } = response.data.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return { accessToken, refreshToken };
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};