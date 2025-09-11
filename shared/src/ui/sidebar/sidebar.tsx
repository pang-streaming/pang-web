import styled from "styled-components";
import {SidebarToggleButton} from "../buttons/sidebarToggleButton";
import {SidebarItem} from "./sidebar.constant";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {PangLogo} from "../../asset/logo/pangLogo";

interface SidebarProps {
	isSidebarOpen: boolean;
	onClickMenu: () => void;
	sidebarItems: SidebarItem[];
	type: 'streamer' | 'user';
	children?: React.ReactNode;
}

export const Sidebar = ({isSidebarOpen, onClickMenu, sidebarItems, children, type}: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<SidebarContainer isSidebarOpen={isSidebarOpen}>
			<SidebarHeaderWrapper isSidebarOpen={isSidebarOpen}>
				<SidebarToggleButton onClick={onClickMenu}/>
				<PangLogo type={type} onClick={() => navigate('/')} cursor="pointer"/>
			</SidebarHeaderWrapper>
			<SidebarItemWrapper>
				{
					sidebarItems.map((item) => (
						<SidebarItemButton key={item.id} isSidebarOpen={isSidebarOpen} $isActive={location.pathname === item.path} onClick={() => navigate(item.path)}>
							{item.icon}
							{isSidebarOpen && <SidebarItemButtonInfo>{item.name}</SidebarItemButtonInfo>}
						</SidebarItemButton>
					))
				}
			</SidebarItemWrapper>
			<SidebarBorder/>
			<SidebarItemWrapper>
				{children}
			</SidebarItemWrapper>
		</SidebarContainer>
	)
}

const SidebarBorder = styled.div`
	width: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.border.light};
`

const SidebarItemButtonInfo = styled.span`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

const SidebarItemButton = styled.button<{isSidebarOpen: boolean, $isActive: boolean}>`
    border: none;
    cursor: pointer;
    height: 40px;
    margin: 0 20px;
    width: ${({isSidebarOpen}) => isSidebarOpen ? 200 : 40}px;
    border-radius: ${({theme}) => theme.borders.large};
    color: ${({theme, $isActive}) => $isActive ? theme.colors.primary.normal : theme.colors.button.active};
    background: ${({theme, $isActive}) => $isActive && theme.colors.hover.light} none;
    gap: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    &:hover {
        background-color: ${({theme}) => theme.colors.hover.light};
    }
`

const SidebarItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin: 34px 0;
	align-items: center;
`

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
    width: ${({isSidebarOpen}) => isSidebarOpen ? 240 : 80}px;
    height: 100vh;
    background-color: ${({theme}) => theme.colors.background.normal};
    display: flex;
    flex-direction: column;
    z-index: ${({isSidebarOpen}) => isSidebarOpen ? 20 : "auto"};
`