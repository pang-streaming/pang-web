import {Outlet} from "react-router-dom";
import {useState} from "react";
import {CustomThemeProvider} from "../provider/customThemeProvider";
import {Sidebar} from "../sidebar/sidebar";
import {Header} from "../header/header";
import styled from "styled-components";
import {streamerSidebarItems, userSidebarItems} from "../sidebar/sidebar.constant";

interface DefaultLayoutProps {
	type: 'streamer' | 'user';
}

export const FullScreenLayout = ({type}: DefaultLayoutProps) => {
	const [tabs, setTabs] = useState(false);
	const sidebarItems = type === 'streamer' ? streamerSidebarItems : userSidebarItems;

	return (
		<CustomThemeProvider>
			<Sidebar isSidebarOpen={tabs} onClickMenu={() => setTabs(!tabs)} sidebarItems={sidebarItems} type={type}>
			</Sidebar>
			<Header onClickMenu={() => setTabs(!tabs)} type={type}/>
			{ tabs && <BlurContainer/> }
			<MainContainer>
				<Outlet/>
			</MainContainer>
		</CustomThemeProvider>
	)
}

const BlurContainer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 11;
`;

const MainContainer = styled.main`
    flex: 1;
    min-height: calc(100vh - 67px);
    margin-top: 67px;
    margin-left: 80px;
    padding: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    & > * {
        width: 100%;
        margin: 0 auto;
        flex: 1;
    }
`