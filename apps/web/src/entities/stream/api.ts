import api from "@/api/api"

export const fetchLiveStreamDetail = async (streamId: string) => {
    return await api.get(`/stream/${streamId}`)
}