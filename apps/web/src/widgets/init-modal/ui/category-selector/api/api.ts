import api from "@/api/api";

export const saveUserInterests = async (interests: string[]) => {
    const body = { interests };
    const res = await api.post("/interests", body);
    return res.data;
  };