
import axios from "axios";
import { SearchResponse } from "./type";

export interface Pageable {
  page: number;
  size: number;
  sort: string[];
}
  
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  paramsSerializer: {
    serialize: (params) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query.append(key, JSON.stringify(value));
        } else {
          query.append(key, String(value));
        }
      });
      
      return query.toString();
    },
  },
})

api.interceptors.request.use((config) => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    
    const token = getCookie("accessToken") || localStorage.getItem("accessToken");
    console.log('[API 인터셉터] 요청 URL:', config.url, '토큰:', token ? '있음' : '없음');
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



  export const searchAll = async (keyword: string) => {
    const res = await api.get<SearchResponse>(`/search/${keyword}`);
    console.log("통합 검색 API 응답:", res.data);
    return res.data;
  };



export const fetchMyInfo = async (): Promise<UserResponse> => {
    const res = await api.get("/user/me");
    const data = await res.data;
    console.log("내 정보 : ", data);
    return data;
  };

  export type Gender = "MALE" | "FEMALE" | "OTHER";
export type Role = "USER" | "ADMIN" | "STREAMER"; 

export interface User {
  id: string;             
  username: string;
  email: string;
  nickname: string;
  age: string;           
  gender: Gender;
  profileImage: string;
  bannerImage: string;
  isAdult: boolean;
  role: Role;
  isAlarm: boolean;
  description: string;
  cash: number;
}

export interface UserResponse {
  status: string;
  message: string;
  data: User;
  timestamp: string;    
}


