import styled from "styled-components";
import {CustomThemeProvider, SegmentButton} from "@pang/shared/ui";

const TestContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({theme}) => theme.colors.primary.normal};
`

function App() {
  return (
      <CustomThemeProvider>
        <TestContainer />
        <SegmentButton tabs={["s", "About"]} onClick={(tabs) => {console.log(tabs);}} />
      </CustomThemeProvider>
  )
}

export default App
