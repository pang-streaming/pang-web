import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { SearchBar } from "./searchBar";
import { PiMonitorBold, PiSunBold } from "react-icons/pi";
import { HeaderButton } from "../buttons/headerButton";
import { HiOutlineBell, HiOutlineMoon } from "react-icons/hi";
import { FiVideo } from "react-icons/fi";
import { useThemeStore } from "../../store/theme/themeStore";
import { LoginButton } from "../buttons/loginButton";
import { useNavigate } from "react-router-dom";
import { PangLogo } from "../../asset/logo/pangLogo";
import normalProfile from "../../asset/logo/normal_profile.svg";
import { useEffect } from "react";

interface HeaderProps {
  onClickMenu: () => void;
  type: "streamer" | "user";
}

export const Header = ({ onClickMenu, type }: HeaderProps) => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeStore();
  const DarkLightModeIcon = mode === "dark" ? PiSunBold : HiOutlineMoon;
  const MoveButton = type === "user" ? FiVideo : PiMonitorBold;

  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;
  const normalProfileSrc: string = normalProfile;

  const handleProfile = () => {
    navigate("/mypage");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log({ hasToken: token !== null });
  }, []);

  return (
    <HeaderContainer>
      <LogoWrapper>
        <SidebarToggleButton size={28} onClick={onClickMenu} />
        <PangLogo type={type} onClick={() => navigate("/")} cursor="pointer" />
      </LogoWrapper>
      {type === "user" && <SearchBar />}
      <ButtonWrapper>
        <HeaderButton Icon={MoveButton} />
        <HeaderButton Icon={HiOutlineBell} />
        <HeaderButton Icon={DarkLightModeIcon} onClick={toggleTheme} />
        {isLoggedIn ? (
          <ProfileImage src={normalProfileSrc} onClick={handleProfile} />
        ) : (
          <LoginButton />
        )}
      </ButtonWrapper>
    </HeaderContainer>
  );
};

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borders.maximum};
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-right: 36px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

const SidebarToggleButton = styled(IoMenu)`
  cursor: pointer;
  padding: 6px;
  border-radius: ${({ theme }) => theme.borders.large};
  color: ${({ theme }) => theme.colors.button.active};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
  }
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 66px;
  padding: 0 22px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;
