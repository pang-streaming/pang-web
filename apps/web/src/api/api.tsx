import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };
  
  const token = getCookie("accessToken");
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
