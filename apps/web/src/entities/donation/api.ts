import api from "@/api/api";
import * as P  from "./type";


export const donationApi = {
  post: async (data: P.IDonationRequest): Promise<P.IDonationResponse> => {
    const response = await api.post("/donation", data);
    return response.data;
  }
};

