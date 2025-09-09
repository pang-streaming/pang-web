import styled from "styled-components";

export const Sidebar = () => {
	return (
		<SidebarContainer isSidebarOpen={false}>
		</SidebarContainer>
	)
}

interface SidebarProps {
	isSidebarOpen: boolean;
}

const SidebarContainer = styled.aside<SidebarProps>`
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