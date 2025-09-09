import styled from "styled-components";
import {CustomThemeProvider, Header, Sidebar} from "@pang/shared/ui";
import {useState} from "react";

function App() {
    const [tabs, setTabs] = useState(false);

    return (
        <CustomThemeProvider>
            <Sidebar isSidebarOpen={tabs} onClickMenu={() => {setTabs(!tabs);}}/>
            <Header onClickMenu={() => {setTabs(!tabs);}}/>
            <MainContainer>
                hi
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
