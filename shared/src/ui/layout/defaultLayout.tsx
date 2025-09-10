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

export const DefaultLayout = ({type}: DefaultLayoutProps) => {
	const [tabs, setTabs] = useState(false);
	const sidebarItems = type === 'streamer' ? streamerSidebarItems : userSidebarItems;

	return (
		<CustomThemeProvider>
			<Sidebar isSidebarOpen={tabs} onClickMenu={() => setTabs(!tabs)} sidebarItems={sidebarItems} type={type}>
				{/*팔로워 목록 리스트*/}
			</Sidebar>
			<Header onClickMenu={() => setTabs(!tabs)} type={type}/>
			<MainContainer>
				<Outlet/>
			</MainContainer>
		</CustomThemeProvider>
	)
}

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
	
    @media (min-width: 2000px) {
        & > * {
            max-width: 1950px;
        }
    }
`