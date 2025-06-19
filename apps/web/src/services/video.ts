import api from "../api/api";
import { Video } from "../types/video";


export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const res = await api.get("/stream/items");
    console.log(res.data);
    console.log("비디오 가져오기 성공:");
    return res.data;
  } catch (error) {
    console.error("비디오 가져오기 실패:", error);
    return [];
  }
};

export const fetchPopularVideos = async (): Promise<Video[]> => {
  try {
    const res = await api.get("/stream/items/popular");
    return res.data;
  } catch (error) {
    console.error("인기비디오 가져오기 실패:", error);
    return [];
  }
};

interface UserProfileUpdate {
    nickname?: string;
    age?: string;         
    gender?: "남자" | "여자" | "기타";
    profileImage?: string;
    bannerImage?: string;
  }
  export const updateUserProfile = async (data: UserProfileUpdate) => {
    try {
      const res = await api.patch("/user", data);
      return res.data;
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      throw error;
    }
  };