import styled from "styled-components";
import Logo from "../../asset/logo/pang.svg?react";
import {SidebarToggleButton} from "../buttons/sidebarToggleButton";
import {SidebarItems} from "./sidebar.constant";

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
			<SidebarItemWrapper>
				{
					SidebarItems.map((item) => (
						<SidebarItemButton isSidebarOpen={isSidebarOpen}>
							{item.icon}
							{isSidebarOpen && <SidebarItemButtonInfo>{item.name}</SidebarItemButtonInfo>}
						</SidebarItemButton>
					))
				}
			</SidebarItemWrapper>
		</SidebarContainer>
	)
}

const SidebarItemButtonInfo = styled.span`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

const SidebarItemButton = styled.button<{isSidebarOpen: boolean}>`
    border: none;
    cursor: pointer;
    height: 40px;
	margin: 0 20px;
	width: ${({isSidebarOpen}) => isSidebarOpen ? 200 : 40 }px;
    background: none;
    border-radius: ${({ theme }) => theme.borders.large};
    color: ${({ theme }) => theme.colors.button.active};
    gap: 20px;
    display: flex;
	flex-direction: row;
    align-items: center;
    justify-content: start;

    &:hover {
        background-color: ${({ theme }) => theme.colors.hover.light};
    }
`

const SidebarItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin-top: 34px;
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
    width: ${({isSidebarOpen}) => isSidebarOpen ? "240px" : "80px"};
    height: 100vh;
    background-color: ${({theme}) => theme.colors.background.normal};
    color: white;
    display: flex;
    flex-direction: column;
	${({isSidebarOpen}) => (isSidebarOpen && "z-index: 20")}
`