// import {SegmentButton} from "@pang/shared/ui/buttons/segmentButton.tsx";
import styled from "styled-components";
import {CustomThemeProvider} from "@pang/shared/shared";


const TestContainer = styled.div`
    width: 100px;
    height: 100px;
    background-color: ${({theme}) => theme.colors.primary.normal};
`

function App() {
  return (
      <CustomThemeProvider>
        <TestContainer />
        {/*<SegmentButton tabs={["Home", "About"]} onClick={(tabs) => {console.log(tabs);}} />*/}
      </CustomThemeProvider>
  )
}

export default App
