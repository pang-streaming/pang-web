import { StreamSearchResponse } from "./type";
import axios from "axios";

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


  export const searchStream = async (keyword: string, pageable: Pageable) => {
    const res = await api.post(`/stream/search/${keyword}`, null, {
      params: pageable,
    });
    return res.data;
  };



export const fetchMyInfo = async (): Promise<UserResponse> => {
    const res = await api.get("/user/me");
    const data = await res.data;
    console.log("내 정보 : ", data);
    return data;
  };

  export type Gender = "MALE" | "FEMALE" | "OTHER";
export type Role = "USER" | "ADMIN"; 

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


