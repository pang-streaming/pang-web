import { Outlet } from "react-router-dom";
import { ReactNode, useState } from "react";
import { CustomThemeProvider } from "../provider/customThemeProvider";
import { Sidebar } from "../sidebar/sidebar";
import { Header } from "../header/header";
import styled from "styled-components";

interface DefaultLayoutProps {
  children: ReactNode;
}
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [tabs, setTabs] = useState(false);
  return (
    <CustomThemeProvider>
      <Sidebar isSidebarOpen={tabs} onClickMenu={() => setTabs(!tabs)}>
        {/*팔로워 목록 리스트*/}
      </Sidebar>
      <Header onClickMenu={() => setTabs(!tabs)} />
      <MainContainer>
        {/* <Outlet /> */}
        {children}
      </MainContainer>
    </CustomThemeProvider>
  );
};

const MainContainer = styled.main`
  margin-top: 66px;
  margin-left: 80px;
  padding: 40px;
`;
