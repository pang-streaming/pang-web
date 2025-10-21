import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { SearchBar } from "./searchBar";
import { PiMonitorBold, PiSunBold } from "react-icons/pi";
import { HeaderButton } from "../buttons/headerButton";
import { HiOutlineMoon } from "react-icons/hi";
import { FiVideo } from "react-icons/fi";
import { useThemeStore } from "../../store/theme/themeStore";
import { LoginButton } from "../buttons/loginButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PangLogo } from "../../asset/logo/pangLogo";
import { tokenStorage } from "../../lib/cookie";

interface HeaderProps {
  onClickMenu: () => void;
  type: "streamer" | "user";
}

export const Header = ({ onClickMenu, type }: HeaderProps) => {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mode, toggleTheme } = useThemeStore();
  const DarkLightModeIcon = mode === "dark" ? PiSunBold : HiOutlineMoon;
  const MoveButton = type === "user" ? FiVideo : PiMonitorBold;

  const token = tokenStorage.getAccessToken();
  const isLoggedIn = token != null;
  const from = searchParams.get("from");

  const pangUrl = import.meta.env.VITE_PANG_URL;
  const pangStreamerUrl = import.meta.env.VITE_STREAMER_URL;



  const handleMoveButtonClick = () => {
    if (type === "user") {
      window.location.href = pangStreamerUrl
    } else {
      window.location.href = pangUrl
    }
  };

  const handleLogoClick = () => {
    if (from === "streamer") {
      window.location.href = pangStreamerUrl
    } else {
      navigate("/");
    }
  };

  return (
    <HeaderContainer>
      <LogoWrapper>
        {type !== "streamer" && (
          <SidebarToggleButton size={28} onClick={onClickMenu} />
        )}
        <PangLogo type={type} onClick={handleLogoClick} cursor="pointer" />
      </LogoWrapper>
      {type === "user" && <SearchBar />}
      <ButtonWrapper>
        <HeaderButton Icon={MoveButton} onClick={handleMoveButtonClick} />
        <HeaderButton Icon={DarkLightModeIcon} onClick={toggleTheme} />
        <LoginButton isLoggedIn={isLoggedIn} appType={type} />
      </ButtonWrapper>
    </HeaderContainer>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-right: 36px;
  z-index: auto;
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
  user-select: none;
`;
