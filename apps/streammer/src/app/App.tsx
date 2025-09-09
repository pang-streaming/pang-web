import styled from "styled-components";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {CustomThemeProvider, Header, Sidebar} from "@pang/shared/ui";
import {useState} from "react";

function App() {
    const [tabs, setTabs] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <CustomThemeProvider>
            <Sidebar isSidebarOpen={tabs} onClickMenu={() => {setTabs(!tabs);}} activeItem={location.pathname} moveLocation={navigate}>
                {/*팔로워 목록 리스트*/}
            </Sidebar>
            <Header onClickMenu={() => {setTabs(!tabs);}}/>
            <MainContainer>
                <Routes>
                    <Route path={'/explore'} element={<h1>asd</h1>}/>
                </Routes>
            </MainContainer>
        </CustomThemeProvider>
)
}

const MainContainer = styled.main`
    margin-top: 66px;
    margin-left: 80px;
    padding: 0;
`

export default App
