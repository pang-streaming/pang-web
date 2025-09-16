import { fetchMyInfo } from "@/entities/user/api/api";
import { User } from "@/entities/user/model/type";
import { useEffect, useState } from "react";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import * as S from "./style";

export const MyInfoSection = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const result = await fetchMyInfo();
        setUser(result.data);
      } catch (error) {
        console.error("유저 정보 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);
  if (loading) {
    return (
      <S.Container>
        <div
          style={{
            height: "90px",
          }}
        ></div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ProfileImage src={user?.profileImage || normalProfile} />
      <S.UserInfoSection>
        <S.Nickname>{user?.nickname}</S.Nickname>
        <S.Email>{user?.email}</S.Email>
        <S.StatusMessage>
          {user?.description}
        </S.StatusMessage>
      </S.UserInfoSection>
    </S.Container>
  );
};
