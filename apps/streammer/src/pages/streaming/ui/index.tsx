<<<<<<< HEAD
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

=======
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Video } from './components/video';
import { StreamSetting } from './components/streamSetting';
import { useCanvasSize } from '@/features/canvas/hooks/useCanvasSize';
import { useScreenManagement } from '@/features/canvas/hooks/useScreenManagement';
import { AddSourceModal } from '@/features/modal/components/AddSourceModal';
import { useAddSourceModal } from '@/features/modal/hooks/useAddSourceModal';
import { Screen } from '@/features/canvas/constants/canvas-constants';
import { useAudioStore } from '@/features/audio/stores/useAudioStore';

const StreamingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSize = useCanvasSize(containerRef);
  const { screens, setScreens, addVideoScreen, addScreen, clearScreens } = useScreenManagement(canvasSize);
  
  const modal = useAddSourceModal();
  const { removeAudioTrack } = useAudioStore();
  
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

  const handleRemoveScreen = (screenId: number) => {
    if (screenId === 999) {
      setIsVTuberEnabled(false);
      setVrmUrl(null);
      setSelectedDevice(null);
    } else {
      setScreens((prev) => {
        const screen = prev.find(s => s.id === screenId);
        if (screen) {
          if (screen.stream) {
            const audioTrack = screen.stream.getAudioTracks()[0];
            if (audioTrack) {
              console.log(`Removing audio track for screen ${screenId}:`, audioTrack.id);
              removeAudioTrack(audioTrack.id);
            }
            
            screen.stream.getVideoTracks().forEach(track => track.stop());
          }
        }
        return prev.filter(s => s.id !== screenId);
      });
    }
  };

  return (
    <PageContainer>
      <DashboardContainer>
	      <VideoWrapper ref={containerRef}>
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
	      </VideoWrapper>
>>>>>>> main
        <ChatSection>
          <h2>채팅 영역</h2>
        </ChatSection>
      </DashboardContainer>
<<<<<<< HEAD
=======
      
      <StreamSettingSection>
	      <StreamSetting
		      onVideoAddButtonClick={modal.openModal}
		      screens={screens}
		      setScreens={setScreens}
		      onRemoveScreen={handleRemoveScreen}
	      />
      </StreamSettingSection>

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
>>>>>>> main
    </PageContainer>
  );
};

export default StreamingPage;

<<<<<<< HEAD
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
=======
const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
  padding: 14px;
  overflow: hidden;
  min-height: 0;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

const StreamSettingSection = styled.div`
  display: flex;
  flex-direction: row;
	width: 100%;
	box-sizing: border-box;
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
>>>>>>> main
`;
