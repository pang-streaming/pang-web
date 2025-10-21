import api from "@/api/api";
import { IStreamDataResponse } from "../model/type";


export const fetchVideos = async (): Promise<IStreamDataResponse[]> => {
        const res = await api.get("/stream");
        return res.data.data || [];
};


export const getStreamData = async (streamId:string): Promise<IStreamDataResponse> => {
    const res = await api.get(`/stream/${streamId}`);
    return res.data.data || [];
};

export const fetchRecentVideo = async () => {
    const res = await api.get("/video/recent");
    return res.data.data || [];
}

export const fetchFollowingLives = async (): Promise<IStreamDataResponse[]> => {
    const res = await api.get('/stream/following');
    return res.data || [];
}

export const fetchLiveByUsername = async (username: string): Promise<IStreamDataResponse[]> => {
    const res = await api.get('/video/streamer', { params: { username } });
    return res.data?.data || []; 
  };
  


  