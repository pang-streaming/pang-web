import api from "@/api/api"
import { LastVideoResponse } from "./type";


export const fetchLastVideoByUsername = async (username: string): Promise<LastVideoResponse> => {
    const res = await api.get('/video/streamer/recorded', {
        params: { username }
    });
    console.log("fetchLastVideoByUsername 응답:", res.data);
    return res.data;
}

export const fetchAllLastVideo = async (): Promise<LastVideoResponse> => {
    const res = await api.get('/video');
    return res.data;
}

export const fetchFollowingLastVideo = async (): Promise<LastVideoResponse> => {
    const res = await api.get(`/stream/ended/following`);
    return res.data;
}