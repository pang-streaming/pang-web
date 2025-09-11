import api from "@/api/api";


export const loginUser = async (id: string, password: string) => {
  const res = await api.post("/auth/login", { id, password });
  return res.data;
};
