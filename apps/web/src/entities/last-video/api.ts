import api from "@/api/api"
import { LastVideoResponse } from "./type";


export const fetchLastVideo = async (username: string): Promise<LastVideoResponse> => {
    const res = await api.get('/video/streamer/recorded', {
        params: { username }
    });
    console.log("fetchLastVideo 응답:", res.data);
    return res.data;
}
