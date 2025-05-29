import api from "../api/api";

export const signup = async (userInfo: any) => {
  const res = await api.post("/auth/register", userInfo);
  return res.data;
};
export const login = async (id: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { id, password });
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
   
    return null;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
