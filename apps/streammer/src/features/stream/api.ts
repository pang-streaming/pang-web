import { api } from "@pang/shared/ui"
import { StreamKeyResponse } from "./type";


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
  communityId: number;
}

export interface UserResponse {
  status: string;
  message: string;
  data: User;
  timestamp: string;    
}




export interface OtherUser {

    nickname : string
    profileImage? : string
    bannerImag? : string
    description? : string
    communityId : number
    followerCount : number
    isFollowed : boolean
}


export interface OtherUserResponse {
    status: string;
    message: string;
    data: OtherUser;
    timestamp: string
}



export const createStreamKey = async (params: StreamKeyType) => {
    const res = await api.post("/stream/key?stream-type=WHIP");
    return res.data;
}

interface StreamKeyType {
    'stream-type': 'WHIP' | 'RTMP'
}

export const fetchStreamKey = async (): Promise<StreamKeyResponse> => {
    const res = await api.get('/stream/key');
    return res.data;
  };


export const fetchMyInfo = async (): Promise<UserResponse> => {
    const res = await api.get("/user/me");
    const data = await res.data;
    console.log("내 정보 : ", data);
    return data;
  };
  
  
  
  export const fetchOtherUserInfo = async ({ username }: {username: string}): Promise<OtherUserResponse> => {
    const res = await api.get(`/user/${username}`);
    return res.data;
  };