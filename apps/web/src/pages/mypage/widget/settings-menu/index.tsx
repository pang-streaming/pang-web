import { logoutUser } from "@/features/auth/api/login-api";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import chevronRight from "@/app/assets/chevron-right.svg";

export const SettingsMenu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  const menus: { label: string; onClick: () => void }[] = [
    { label: "팔로우 목록 보기", onClick: () => {} },
    { label: "최근 시청한 영상 보기", onClick: () => {} },
    { label: "프로필 정보 수정하기", onClick: () => {} },
    { label: "성인인증 진행하기", onClick: () => {} },
    { label: "로그아웃", onClick: handleLogout },
    { label: "회원탈퇴", onClick: () => {} },
  ];

  return (
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
  );
};
