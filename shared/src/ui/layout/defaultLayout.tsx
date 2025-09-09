import {Outlet} from "react-router-dom";
import {useState} from "react";
import {CustomThemeProvider} from "../provider/customThemeProvider";
import {Sidebar} from "../sidebar/sidebar";
import {Header} from "../header/header";
import styled from "styled-components";

export const DefaultLayout = () => {
	const [tabs, setTabs] = useState(false);
	return (
		<CustomThemeProvider>
			<Sidebar isSidebarOpen={tabs} onClickMenu={() => setTabs(!tabs)}>
				{/*팔로워 목록 리스트*/}
			</Sidebar>
			<Header onClickMenu={() => setTabs(!tabs)}/>
			<MainContainer>
				<Outlet/>
			</MainContainer>
		</CustomThemeProvider>
	)
}

const MainContainer = styled.main`
    padding: 0;
    margin-top: 67px;
    margin-left: 72px;
`