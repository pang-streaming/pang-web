import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Video } from './components/video';
import { StreamSetting } from './components/streamSetting';
import { useCanvasSize } from '@/features/canvas/hooks/useCanvasSize';
import { useScreenManagement } from '@/features/canvas/hooks/useScreenManagement';
import { AddSourceModal } from '@/features/modal/components/AddSourceModal';
import { useAddSourceModal } from '@/features/modal/hooks/useAddSourceModal';
import { Screen } from '@/features/canvas/constants/canvas-constants';

const StreamingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSize = useCanvasSize(containerRef);
  const { screens, setScreens, addVideoScreen, addScreen, clearScreens } = useScreenManagement(canvasSize);
  
  const modal = useAddSourceModal();
  
  const [vrmUrl, setVrmUrl] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(null);
  const [isVTuberEnabled, setIsVTuberEnabled] = useState(false);

  const handleAddScreen = (screen: Screen) => {
    addScreen(screen);
  };

  const handleAddVTuber = (vrmUrl: string | null, device: MediaDeviceInfo) => {
    setVrmUrl(vrmUrl);
    setSelectedDevice(device);
    setIsVTuberEnabled(true);
  };

  return (
    <PageContainer>
      <DashboardContainer>
        <VideoSection>
          <Video
            canvasSize={canvasSize}
            containerRef={containerRef}
            screens={screens}
            setScreens={setScreens}
            viewers={123}
            likes={456}
            vrmUrl={vrmUrl}
            selectedDevice={selectedDevice}
            isVTuberEnabled={isVTuberEnabled}
          />
        </VideoSection>

        <StreamSettingSection>
          <StreamSetting
            onVideoAddButtonClick={modal.openModal}
          />
        </StreamSettingSection>

        <ChatSection>
          <h2>채팅 영역</h2>
        </ChatSection>
      </DashboardContainer>

      <AddSourceModal
        isOpen={modal.isOpen}
        selectedType={modal.selectedType}
        onClose={modal.closeModal}
        onSelectType={modal.selectType}
        onGoBack={modal.goBack}
        canvasSize={canvasSize}
        onAddScreen={handleAddScreen}
        onAddVTuber={handleAddVTuber}
      />
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
