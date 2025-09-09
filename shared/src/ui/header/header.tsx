import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import {SearchBar} from "./searchBar";

interface HeaderProps {
	onClickMenu: () => void;
}

export const Header = ({onClickMenu}: HeaderProps) => {
	return (
		<HeaderContainer>
			<SidebarToggleButton size={28} onClick={onClickMenu}/>
			<SearchBar/>
			<SidebarToggleButton size={28} onClick={onClickMenu}/>
		</HeaderContainer>
	)
}

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