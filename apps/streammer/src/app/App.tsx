import styled from "styled-components";
import {CustomThemeProvider, Header, Sidebar} from "@pang/shared/ui";

function App() {
  return (
      <CustomThemeProvider>
          <Sidebar/>
          <Header onClickMenu={() => {console.log('hi')}}/>
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
