import {Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {CustomThemeProvider} from "../provider/customThemeProvider";
import {Sidebar} from "../sidebar/sidebar";
import {Header} from "../header/header";
import styled from "styled-components";

export const DefaultLayout = () => {
	const [tabs, setTabs] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<CustomThemeProvider>
			<Sidebar isSidebarOpen={tabs} onClickMenu={() => setTabs(!tabs)} activeItem={location.pathname} moveLocation={navigate}>
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
    margin-top: 66px;
    margin-left: 80px;
    padding: 0;
`