import React from "react";
import styled from "styled-components";
import { Video } from "./components/video";
import { StreamSetting } from "./components/streamSetting";

const StreamingPage: React.FC = () => {
  return (
    <PageContainer>
      <DashboardContainer>
        <VideoSection>
          <Video />
        </VideoSection>

        <StreamSettingSection>
          <StreamSetting />
        </StreamSettingSection>

        <ChatSection>
          <h2>채팅 영역</h2>
        </ChatSection>
      </DashboardContainer>
    </PageContainer>
  );
};

export default StreamingPage;

/* Styled */
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -2.6%;
`;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "video chat"
    "settings chat";
  gap: 12px;
  padding: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "video"
      "settings"
      "chat";
  }
`;

const VideoSection = styled.div`
  grid-area: video;
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 유지 */

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const StreamSettingSection = styled.div`
  grid-area: settings;
  padding: 0px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChatSection = styled.div`
  grid-area: chat;
  padding: 16px;
  overflow-y: auto;
  max-height: 100%;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.colors.background.light}; /* 임시 색상, theme 없을 때 */
`;
