import styled from "styled-components";
import Logo from "../../asset/logo/pang.svg?react";
import {SidebarToggleButton} from "../buttons/sidebarToggleButton";

interface SidebarProps {
	isSidebarOpen: boolean;
	onClickMenu: () => void;
}

export const Sidebar = ({isSidebarOpen, onClickMenu}: SidebarProps) => {
	return (
		<SidebarContainer isSidebarOpen={isSidebarOpen}>
			<SidebarHeaderWrapper isSidebarOpen={isSidebarOpen}>
				<SidebarToggleButton onClick={onClickMenu}/>
				<Logo/>
			</SidebarHeaderWrapper>
		</SidebarContainer>
	)
}

const SidebarHeaderWrapper = styled.div<{isSidebarOpen: boolean}>`
	height: 66px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
	padding-left: 22px;
    border-bottom: 1px solid ${({theme}) => theme.colors.border.light};
`

const SidebarContainer = styled.aside<{isSidebarOpen: boolean}>`
    position: fixed;
    top: 0;
    left: 0;
    width: ${({isSidebarOpen}) => isSidebarOpen ? "240px" : "80px"};
    height: 100vh;
    background-color: ${({theme}) => theme.colors.background.normal};
    color: white;
    display: flex;
    flex-direction: column;
    //transition: width 0.15s ease;
	${({isSidebarOpen}) => (isSidebarOpen && "z-index: 20")}
`