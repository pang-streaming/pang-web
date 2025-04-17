import styled from "styled-components"
import { SidebarItemProps } from "./sidebar.props"
import { theme } from "@repo/ui/theme"

export const ItemIconAndText = styled.div<SidebarItemProps>`
    display: flex;
    margin-left: 13px;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    border-radius: 10px;
    padding: 15px;
    margin-right: 25px;
    color: #ffffff ;
    transition: 0.1s background-color;
    text-align: center;
    cursor: pointer;

    ${({ isSelected }) => isSelected && `
        background-color: ${theme.netural800};
        color: ${theme.primary500} !important;
    ` };

    &:hover{
        background-color: ${(props)=>props.theme.netural800};
    }
`

export const ItemIconAndTextCliped = styled.div<SidebarItemProps>`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
    font-size: 12px;
    text-align: center;
    white-space: pre-wrap;

    color: #989898;
    ${({ isSelected }) => isSelected && `
        color: ${theme.primary500};
    ` };
    cursor: pointer;
`

export const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
`

export const HeaderLogoContainer = styled.div`
    position: absolute;
    z-index: 999;
    display: flex;
    align-items: center;
    top: -64px;
    gap: 18px;
    height: 64px;
    width: 240px;
    border-bottom: 1px solid ${(props)=>props.theme.gray700};
    background-color: ${(props)=> props.theme.netural900};
`

export const BaseSidebar = styled.div`
    grid-row: span 2;
    color: #fff;
    background-color: ${(props)=> props.theme.netural900};
    height: calc(100% - 64px);
    overscroll-behavior: none;
    position: relative;
    top: 64px;
    z-index: 2;
`;