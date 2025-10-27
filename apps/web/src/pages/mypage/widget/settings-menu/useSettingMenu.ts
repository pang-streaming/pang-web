import { updateMyInfo, fetchMyInfo } from "@/entities/user/api";
import { UserResponse } from "@/entities/user/type";
import { useState, useEffect } from "react";

interface UseSettingMenuProps {
  initialNickname?: string;
  initialAge?: string;
  initialGender?: string;
  initialProfileImage?: string;
  initialBannerImage?: string;
  initialDescription?: string;
}

export const useSettingMenu = ({
  initialNickname = "",
  initialAge = "",
  initialGender = "",
  initialProfileImage = "",
  initialBannerImage = "",
  initialDescription = "",
}: UseSettingMenuProps) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [age, setAge] = useState(initialAge);
  const [gender, setGender] = useState(initialGender);
  const [profileImage, setProfileImage] = useState(initialProfileImage);
  const [bannerImage, setBannerImage] = useState(initialBannerImage);
  const [description, setDescription] = useState(initialDescription);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);


  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchMyInfo();
        if (userInfo.data) {
          setNickname(userInfo.data.nickname || "");
          setAge(userInfo.data.age || "");
          setGender(userInfo.data.gender || "");
          setProfileImage(userInfo.data.profileImage || "");
          setBannerImage(userInfo.data.bannerImage || "");
          setDescription(userInfo.data.description || "");
        }
      } catch (err) {
        console.error("사용자 정보 로드 실패:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: UserResponse = await updateMyInfo(
        nickname || undefined,
        age || undefined,
        gender.toUpperCase() === "MALE"
          ? "MALE"
          : gender.toUpperCase() === "FEMALE"
            ? "FEMALE"
            : "OTHER",
        profileImage || undefined,
        bannerImage || undefined,
        description || undefined
      );
      alert("정보 수정 완료!");
      return res;
    } catch (err: any) {
      setError(err.message || "정보 업데이트 실패");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    nickname,
    setNickname,
    age,
    setAge,
    gender,
    setGender,
    profileImage,
    setProfileImage,
    bannerImage,
    setBannerImage,
    description,
    setDescription,
    loading,
    error,
    initialLoading,
    handleUpdate,
  };
};
