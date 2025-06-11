import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (
    token &&
    config.url &&
    !config.url.includes("/auth/register") &&
    !config.url.includes("/auth/login")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

export const signup = async (userInfo: { email: string; id: string; password: string }) => {
  const res = await api.post("/auth/register", userInfo);
  return res.data;
};