import React, {useRef} from "react";
import styled from "styled-components";
import { Video } from "./components/video";
import { StreamSetting } from "./components/streamSetting";
import {useCanvasSize} from "@/features/canvas/hooks/useCanvasSize";
import {useScreenManagement} from "@/features/canvas/hooks/useScreenManagement";

const StreamingPage: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [audios, setAudios] = React.useState<MediaStreamTrack[]>([]);
	
	const canvasSize = useCanvasSize(containerRef);
	const { screens, setScreens, addVideoScreen, clearScreens } = useScreenManagement(canvasSize, setAudios);
  return (
    <PageContainer>
      <DashboardContainer>
        <VideoSection>
          <Video
	          canvasSize={canvasSize}
	          containerRef={containerRef}
	          screens={screens}
	          audios={audios}
	          setScreens={setScreens}
            viewers={123}
            likes={456}
          />
        </VideoSection>

        <StreamSettingSection>
          <StreamSetting
	          setAudios={setAudios}
            onVideoAddButtonClick={addVideoScreen}
          />
        </StreamSettingSection>

        <ChatSection>
          <h2>채팅 영역</h2>
        </ChatSection>
      </DashboardContainer>
    </PageContainer>
  );
};

export default StreamingPage;

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
  padding-top: 56%;

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
  padding: 0 16px;
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
  background-color: ${({ theme }) => theme.colors.background.light};
`;
