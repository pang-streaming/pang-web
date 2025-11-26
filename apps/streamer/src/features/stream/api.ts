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

export interface TempKeyResponse {
	"status": string,
	"message": string,
	"data": {
		"key": string,
		"webRtcUrl": string
	},
	"timestamp": string
}

export const createStreamKey = async (): Promise<TempKeyResponse> => {
    const res = await api.post("/temp");
    return res.data;
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

export interface StreamTitleUpdateRequest {
  title: string;
}

export interface StreamTitleUpdateResponse {
  status: string;
  message: string;
  data: {
    title: string;
  };
  timestamp: string;
}

export const updateStreamTitle = async (title: string): Promise<StreamTitleUpdateResponse> => {
  const res = await api.put('/stream/title', { title });
  return res.data;
};

export interface StreamStatusResponse {
  status: string;
  message: string;
  data: {
    status: "LIVE" | "ENDED";
    streamType: "RTMP" | "WHIP";
    categoryId: number;
    title: string;
  };
  timestamp: string;
}

export const fetchStreamStatus = async (): Promise<StreamStatusResponse> => {
  const res = await api.post('/stream/me/status');
  return res.data;
};

export interface Category {
  id: number;
  name: string;
  description?: string;
  postImage?: string;
}

export interface CategoriesResponse {
  status: string;
  message: string;
  data: Category[];
  timestamp: string;
}

export const fetchCategories = async (): Promise<CategoriesResponse> => {
    const res = await api.get('/categories');
    return res.data;
};

export interface CreateStreamRequest {
    streamKey: string;
}

export interface CreateStreamResponse {
    status: string;
    message: string;
    data: {
        username: string;
        createdAt: string;
    };
    timestamp: string;
}

export const createStream = async (streamKey: string): Promise<CreateStreamResponse> => {
    const res = await api.post('/stream', {}, {
        headers: {
            'X-Stream-Key': streamKey
        }
    });
    return res.data;
};

export const closeStream = async (streamKey: string) => {
    const res = await api.delete('/stream', {
        headers: {
            'X-Stream-Key': streamKey
        }
    });
    return res.data;
};

// 스트리밍 정보 수정 API
export interface UpdateStreamRequest {
  title: string;
  categoryId: number;
  tags: string[];
  thumbnail?: string;
  streamType: "RTMP" | "WHIP";
}

export interface UpdateStreamResponse {
  status: string;
  message: string;
  data: {
    streamId: string;
    title: string;
    url: string;
    thumbnail: string;
    userId: string;
    username: string;
    nickname: string;
    profileImage: string;
    followers: number;
    isFollowed: boolean;
    viewCount: number;
  };
  timestamp: string;
}

export const updateStream = async (
  streamKey: string, 
  updateData: UpdateStreamRequest
): Promise<UpdateStreamResponse> => {
  const res = await api.patch('/stream', updateData, {
    headers: {
      'X-Stream-Key': streamKey
    }
  });
  return res.data;
};

