import api from "@/api/api";
import { VideoItem } from "../model/type";

export const fetchVideos = async (): Promise<VideoItem[]> => {
    const res = await api.get("/stream");
    return res.data.data || [];
};

export const fetchFollowingVideos = async (): Promise<VideoItem[]> => {
    const res = await api.get("/stream/following");
    return res.data.data || [];
};
