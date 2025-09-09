import api from "../../../api/api";
import type { UserResponse } from "../model/type";


export const fetchMyInfo = async (): Promise<UserResponse> => {
  const res = await api.get("/user/me");
  const data = await res.data;
  console.log("내 정보 : ", data);
  return data;
};

export const updateMyInfo = async (
  nickname: string,
  age: string,
  gender: string,
  profileImage?: string,
  bannerImage?: string
): Promise<UserResponse> => {
  const data = {
    nickname,
    age,
    gender,
    profileImage,
    bannerImage,
  };
  const res = await api.patch("/user", data);
  return res.data;
};

