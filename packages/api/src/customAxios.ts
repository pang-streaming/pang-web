import axios from 'axios';
import {useAuthStore} from "@repo/store";

const customAxios = axios.create({
  baseURL: "https://scenario-api.euns.dev",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(
  async (config) => {
    const {accessToken} = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
        const {refreshToken, setTokenData, clearTokenData} = useAuthStore.getState();
        if (refreshToken) {
        try {
            const { data } = await axios.post(`https://scenario-api.euns.dev/auth/refresh`, {
              refreshToken,
            });
            setTokenData({
              accessToken:data.accessToken,
              refreshToken:data.refreshToken
            })
            error.config.headers.Authorization = `Bearer ${data.accessToken}`;
            return customAxios(error.config);
        } catch (refreshError) {
            console.error('토큰 갱신 실패', refreshError);
            clearTokenData()
        }
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;