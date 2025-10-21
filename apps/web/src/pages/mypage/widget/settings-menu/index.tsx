import { logoutUser } from "@/features/auth/api/login-api";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import chevronRight from "@/app/assets/chevron-right.svg";
import { useState } from "react";
import { ProfileEditModal } from "./widget/profile-edit-modal";

interface SettingsMenuProps {
  from?: string | null;
}

export const SettingsMenu = ({ from }: SettingsMenuProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    if (from === "streamer") {
      window.location.href = `${import.meta.env.VITE_STREAMER_URL}/login`
    } else {
      navigate("/");
    }
  };

  const handleRecentVideo = () => {
    navigate("/recent-video")
  }
  const handleGift = () => {
    navigate("/gift-list")
  }
  const handleFollowingList = () => {
    navigate("/following-list")
  }

  const handleOpenProfileModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const menus: { label: string; onClick: () => void }[] = [
    { label: "팔로우 목록 보기", onClick: handleFollowingList },
    { label: "선물 목록 보기", onClick: handleGift },
    { label: "최근 시청한 영상 보기", onClick: handleRecentVideo },
    { label: "프로필 정보 수정하기", onClick: handleOpenProfileModal },
    // { label: "성인인증 진행하기", onClick: () => {} },
    { label: "로그아웃", onClick: handleLogout },
    { label: "회원탈퇴", onClick: () => {} },
  ];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {menus.map((menu, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <S.Container onClick={menu.onClick}>
              <S.Label>{menu.label}</S.Label>
              <img src={chevronRight} />
            </S.Container>
            {index !== menus.length - 1 && <S.Divider color="#525252" />}
          </div>
        ))}
      </div>

      {isModalOpen && <ProfileEditModal onClose={handleCloseModal} />}
    </>
  );
};
