import api from "@/api/api";

export const fetchProducts = async () => {
    return await api.get("/market/items");
};
