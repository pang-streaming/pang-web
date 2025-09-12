import * as S from "./style";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import { FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { fetchMyInfo } from "@/entities/user/api/api";
import { User } from "@/entities/user/model/type";
import { logoutUser } from "@/features/auth/api/login-api";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchMyInfo();
      setUser(result.data);
    };
    getUserInfo();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); 
    navigate("/explore"); 
  };

  return (
    <S.MypageContainer>
      <S.MyTitle>MY</S.MyTitle>
      <S.MyElementsContainer>
        <S.MyProfileContainer>
          <S.MyProfileImage>
            <img
              src={user?.profileImage || normalProfile}
              alt="프로필 이미지"
            />
          </S.MyProfileImage>
          <S.MyProfileInfo>
            <S.MyProfileName>{user?.username}</S.MyProfileName>
            <S.MyProfileId>E-MAIL : {user?.email}</S.MyProfileId>
            <S.MyProfileMessage>
              먼지는 엄청 커다란 민덕간식을 좋아해요
            </S.MyProfileMessage>
          </S.MyProfileInfo>
        </S.MyProfileContainer>
        <S.MyPungContainer>
          <S.ProfileImage>
            <span
              style={{
                width: 57,
                height: 57,
                fontSize: 24,
                backgroundColor: "#737373",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              💣
            </span>
          </S.ProfileImage>
          <S.MyPungText>
            보유중인 펑 : <span>300</span>개
          </S.MyPungText>
        </S.MyPungContainer>
        <S.MyPageSectionContainer>
          <S.MyPageSections>
            <span style={{ color: "white" }}>회원 정보 수정</span>
            <FiChevronRight />
          </S.MyPageSections>
          <S.MyPageSections>
            <span style={{ color: "white" }}>푸시 알림 설정</span>
            <FiChevronRight />
          </S.MyPageSections>
          <S.MyPageSections>
            <span style={{ color: "white" }}>나의 펑 보기</span>
            <FiChevronRight />
          </S.MyPageSections>
          <S.MyPageSections>
            <span style={{ color: "white" }}>테마 설정</span>
            <FiChevronRight />
          </S.MyPageSections>
          <S.MyPageSections>
            <span style={{ color: "white" }}>앱 버전 정보</span>
            <FiChevronRight />
          </S.MyPageSections>
          <S.MyPageSections onClick={handleLogout}>
            <span  style={{ color: "white" }}>
              로그아웃
            </span>
            <FiChevronRight />
          </S.MyPageSections>
        </S.MyPageSectionContainer>
      </S.MyElementsContainer>
    </S.MypageContainer>
  );
};
