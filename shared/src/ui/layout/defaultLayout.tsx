import { Outlet } from "react-router-dom";
import { useState } from "react";
import { CustomThemeProvider } from "../provider/customThemeProvider";
import { Sidebar } from "../sidebar/sidebar";
import { Header } from "../header/header";
import styled from "styled-components";
import {
  streamerSidebarItems,
  userSidebarItems,
} from "../sidebar/sidebar.constant";
import { FollowingCard } from "../sidebar/ui/following-card";
import { useFollowing } from "../sidebar/ui/following-card/api";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "../header/api";

interface DefaultLayoutProps {
  type: "streamer" | "user";
  full?: boolean;
}

export const DefaultLayout = ({ type, full }: DefaultLayoutProps) => {
  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const [tabs, setTabs] = useState(false);
  const sidebarItems =
    type === "streamer" ? streamerSidebarItems : userSidebarItems;

  const username = data?.data?.username || "";
  const { data: followingData, isLoading } = useFollowing(username, {
    enabled: type === "user" && !!username,
  });

  return (
    <CustomThemeProvider>
      {type === "streamer" ? (
        <></>
      ) : (
        <Sidebar
          isSidebarOpen={tabs}
          onClickMenu={() => setTabs(!tabs)}
          sidebarItems={sidebarItems}
          type={type}
        >
          {isLoading ? (
            <></>
          ) : (
            followingData?.data.map((user) => (
              <FollowingCard
                key={user.username}
                profileImage={user.image}
                nickname={user.nickname}
                username={user.username}
                isSidebarOpen={tabs}
              />
            ))
          )}
        </Sidebar>
      )}
      <Header onClickMenu={() => setTabs(!tabs)} type={type} />
      {tabs && <BlurContainer onClick={() => setTabs(false)} />}
      <MainContainer full={full} type={type}>
        <Outlet />
      </MainContainer>
    </CustomThemeProvider>
  );
};

const BlurContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 11;
`;

const MainContainer = styled.main<{ full?: boolean; type: string }>`
  flex: 1;
  min-height: calc(100vh - 67px);
  margin-top: 67px;
  margin-left: ${({ type }) => (type === "streamer" ? "0" : "60px")};
  padding: 2em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & > * {
    width: 100%;
    margin: 0 auto;
    flex: 1;
  }

  ${({ full }) =>
    !full &&
    `
    @media (min-width: 2100px) {
      & > * {
        max-width: 1950px;
      }
    }
  `}
`;
