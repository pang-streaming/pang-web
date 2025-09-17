import api from "@/api/api";
import { IStreamDataResponse, VideoItem } from "../model/type";
import { dummyVideos } from "../_dummy";

export const fetchVideos = async (): Promise<VideoItem[]> => {
    try {
        const res = await api.get("/stream");
        return [...(res.data.data || []), ...dummyVideos];
    } catch (error) {
        return dummyVideos;
    }
};


export const getStreamData = async (streamId:string): Promise<IStreamDataResponse> => {
    const res = await api.get(`/stream/${streamId}`);
    return res.data.data || [];
};

export const fetchFollowingVideos = async (): Promise<VideoItem[]> => {
    const res = await api.get("/stream/following");
    return res.data.data || [];
};
