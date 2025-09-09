import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import {SearchBar} from "./searchBar";
import { PiSunBold } from "react-icons/pi";
import Logo from "../../asset/logo/pang.svg?react";
import {HeaderButton} from "./headerButton";
import {HiOutlineBell, HiOutlineMoon} from "react-icons/hi";
import {FiVideo} from "react-icons/fi";
import {useThemeStore} from "../../store/theme/themeStore";
import {LoginButton} from "../buttons/loginButton";

interface HeaderProps {
	onClickMenu: () => void;
}

export const Header = ({onClickMenu}: HeaderProps) => {
	const {mode, toggleTheme} = useThemeStore()

	const DarkLightModeIcon = mode === 'dark' ? PiSunBold : HiOutlineMoon;

	return (
		<HeaderContainer>
			<LogoWrapper>
				<SidebarToggleButton size={28} onClick={onClickMenu}/>
				<Logo/>
			</LogoWrapper>
			<SearchBar/>
			<ButtonWrapper>
				<HeaderButton Icon={FiVideo}/>
				<HeaderButton Icon={HiOutlineBell}/>
				<HeaderButton Icon={DarkLightModeIcon} onClick={toggleTheme}/>
				<LoginButton/>
			</ButtonWrapper>
		</HeaderContainer>
	)
}

const LogoWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 24px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 18px;
`

const SidebarToggleButton = styled(IoMenu)`
    cursor: pointer;
	padding: 6px;
	border-radius: ${({theme}) => theme.borders.large};
    color: ${({ theme }) => theme.colors.button.active};

    &:hover {
        background-color: ${({theme}) => theme.colors.hover.light};
    }
`

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 66px;
    padding: 0 22px;
    background-color: ${({theme}) => theme.colors.background.normal};
    border-bottom: 1px solid ${({theme}) => theme.colors.border.light};
    display: flex;
    align-items: center;
	justify-content: space-between;
    z-index: 10;
`;