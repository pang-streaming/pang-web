import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NormalProfile from "../../asset/logo/normal_profile.svg?react";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "../header/api";

interface LoginButtonProps {
  isLoggedIn: boolean;
}

export const LoginButton = ({ isLoggedIn }: LoginButtonProps) => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    enabled: isLoggedIn, 
  });

  const profileImage = data?.data?.profileImage;

  if (!isLoggedIn) {
    return (
      <LoginButtonContent onClick={() => navigate("/login")}>
        로그인
      </LoginButtonContent>
    );
  }

  return (
    <ProfileImageWrapper onClick={() => navigate("/mypage")}>
      {isLoading ? (
        <NormalProfile />
      ) : profileImage ? (
        <img src={profileImage} alt="프로필 이미지" />
      ) : (
        <NormalProfile />
      )}
    </ProfileImageWrapper>
  );
};


const LoginButtonContent = styled.button`
  user-select: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.common.white};
  background-color: ${({ theme }) => theme.colors.primary.normal};
  padding: 6px 19px;
  text-align: center;
  border-radius: ${({ theme }) => theme.borders.large};
  line-height: 18px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const ProfileImageWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borders.maximum};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img,
  svg {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borders.maximum};
    object-fit: cover;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
