import api from "@/api/api";

export const fetchTransaction = async () => {
    const res = await api.get("/cash");
    return res.data;
  }