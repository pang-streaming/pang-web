import api from "@/api/api";
import type { Video } from "../model/type";




export const fetchVideos = async (): Promise<Video[]> => {
    try {
      const res = await api.get("/stream");
      console.log("fetched", res.data);
      return res.data;
    } catch (error) {
      console.error("비디오 가져오기 실패:", error);
      return [];
    }
  };
  
  export const fetchPopularVideos = async (): Promise<Video[]> => {
    try {
      const res = await api.get("/stream/popular");
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.error("인기비디오 가져오기 실패:", error);
      return [];
    }
  };