import React, { useState } from 'react';
import styled from 'styled-components';
import StreamHeader from './components/StreamHeader';
import StreamPreview from './components/StreamPreview';
import PanelControl from './components/PanelControl';
import ChattingSection from './components/ChattingSection';
import { useStreaming } from '../hooks/useStreaming';
import { SocketProvider } from '../hooks/socket-provider';




const StreamingPage: React.FC = () => {
  const {
    isStreaming,
    scenes,
    sources,
    previewStream,
    addScene,
    switchScene,
    addSource,
    addImageSource,
    addTextSource,
    toggleSourceVisibility,
    setAudioLevel,
    toggleAudioMute,
    updateSourceOrder,
    requestDisplayMedia,
    startStreaming,
    stopStreaming
  } = useStreaming();
  
  const [streamTitle, setStreamTitle] = useState<string>('스트리머의 방송');


  const handleEditTitle = () => {
    const newTitle = prompt('방송 제목을 입력하세요', streamTitle);
    if (newTitle) setStreamTitle(newTitle);
  };

  const handleStartStream = () => {
    startStreaming();
  };

  const handleStopStream = () => {
    stopStreaming();
  };

  const handleTagClick = () => {
  };

  const handleSceneChange = (sceneId: string) => {
    switchScene(sceneId);
  };
  
  const handleSourceToggle = (sourceId: string) => {
    toggleSourceVisibility(sourceId);
  };
  
  

  const handleAddScene = async (name: string, selectedDevices?: string[]) => {
    await addScene(name, selectedDevices);
  };

  const handleAddSource = async (name: string, type: string, deviceId?: string) => {
    await addSource(name, type as 'video' | 'audio' | 'image' | 'text', deviceId);
  };


  return (
    <SocketProvider>
      <PageContainer>
        <StreamLayout>
          <MainContent>
            <StreamHeader 
              title={streamTitle}
              viewerCount={128}
              likeCount={42}
              isStreaming={isStreaming}
              onEditTitle={handleEditTitle}
              onStartStream={handleStartStream}
              onStopStream={handleStopStream}
              onTagClick={handleTagClick}
            />
            
            <StreamPreview 
              previewStream={previewStream}
              sources={sources}
              activeScene={scenes.find(scene => scene.active)}
              onSourceClick={(sourceId) => {
                console.log('Source clicked:', sourceId);
              }}
              onRequestDisplayMedia={async (sourceId) => {
                try {
                  await requestDisplayMedia(sourceId);
                } catch (error) {
                  console.error('화면 공유 오류:', error);
                }
              }}
            />
            
            <PanelControl 
              scenes={scenes}
              sources={sources}
              onSceneChange={handleSceneChange}
              onSourceToggle={handleSourceToggle}
              onVolumeChange={setAudioLevel}
              onMuteToggle={toggleAudioMute}
              onUpdateSourceOrder={updateSourceOrder}
              onAddScene={handleAddScene}
              onAddSource={handleAddSource}
              onAddImageSource={addImageSource}
              onAddTextSource={addTextSource}
            />
          </MainContent>
          
          <ChattingSection 
            streamId="streaming-room-1"
          />
        </StreamLayout>
      </PageContainer>
    </SocketProvider>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.common.white};
`;

const StreamLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  height: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  gap: 16px;
`;

export default StreamingPage;