import api from "@/api/api";

export const sponsorPung = async (
    cardId : string,
    amount: number
) => {
  const res = await api.post("/cash/payment", {
    cardId: cardId,
    amount: amount,
  });

  return res.data;
};
