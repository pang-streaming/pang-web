import styled from "styled-components";

interface BaseSidebarProps {
    $isClipped: boolean;
}

export const BaseSidebar = styled.div<BaseSidebarProps>`
    position: fixed;
    top: 72px;
    left: 0;
    width: ${(props) => (props.$isClipped ? "72px" : "240px")};
    height: calc(100vh - 72px);
    background-color: #1a1a1a;
    border-right: 1px solid #2a2a2a;
    transition: width 0.2s ease;
`;

export const SidebarContainer = styled.div`
    padding: 25px 0;
`;

interface SidebarItemProps {
    $isSelected: boolean;
}

export const SidebarItem = styled.div<SidebarItemProps>`
    padding: 12px 24px;
    cursor: pointer;
    color: ${props => props.$isSelected ? '#ffffff' : '#888888'};
    background-color: ${props => props.$isSelected ? '#2a2a2a' : 'transparent'};
    transition: all 0.2s ease;

    &:hover {
        background-color: #2a2a2a;
        color: #ffffff;
    }
`;

export const ItemIconAndText = styled.div<{ $isSelected: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    cursor: pointer;
    color: ${(props) => (props.$isSelected ? "#ffffff" : "#888888")};
    background-color: ${(props) => (props.$isSelected ? "#2a2a2a" : "transparent")};
    transition: all 0.2s ease;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        background-color: #2a2a2a;
        color: #ffffff;
    }
`;

export const ItemIconAndTextCliped = styled(ItemIconAndText)`
    flex-direction: column;
    padding: 12px 0;
    text-align: center;
    font-size: 12px;
    white-space: pre-line;

    svg {
        margin: 0 auto;
    }
`;
