import React, { useState } from 'react';
import styled from 'styled-components';
import StreamHeader from './components/StreamHeader';
import StreamPreview from './components/StreamPreview';
import PanelControl from './components/PanelControl';
import ChattingSection from './components/ChattingSection';
import { useStreaming } from '../hooks/useStreaming';



interface TopContributor {
  rank: number;
  name: string;
  amount: string;
}

interface ChatMessage {
  id: string;
  viewerName: string;
  chatting: string;
  color: string;
}

const StreamingPage: React.FC = () => {
  // 스트리밍 상태 관리
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
    requestDisplayMedia,
    startStreaming,
    stopStreaming
  } = useStreaming();
  
  const [streamTitle, setStreamTitle] = useState<string>('스트리머의 방송');

  const topContributors: TopContributor[] = [
    { rank: 1, name: '대듀', amount: '208,000' },
    { rank: 2, name: '대구에듀', amount: '98,000' },
    { rank: 3, name: '감귤', amount: '98,000' }
  ];

  const chatMessages: ChatMessage[] = [
    { id: '1', viewerName: '이상한 컴퓨터', chatting: '오늘 있던 폼 없던 폼 다 죽었네', color: '#9A57FF' },
    { id: '2', viewerName: '대듀팬', chatting: '흠...', color: '#FF0055' },
    { id: '3', viewerName: '대 듀', chatting: '여러분 죄송해요', color: '#FFD700' }
  ];

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
  
  
  const handleSendMessage = (_message: string) => {
  };

  const handleAddScene = async (name: string, selectedDevices?: string[]) => {
    await addScene(name, selectedDevices);
  };

  const handleAddSource = async (name: string, type: string, deviceId?: string) => {
    await addSource(name, type as 'video' | 'audio' | 'image' | 'text', deviceId);
  };


  return (
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
            onTagClick={handleTagClick}
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
            onAddScene={handleAddScene}
            onAddSource={handleAddSource}
            onAddImageSource={addImageSource}
            onAddTextSource={addTextSource}
          />
        </MainContent>
        
        <ChattingSection 
          chatList={chatMessages}
          topContributors={topContributors}
          onSendMessage={handleSendMessage}
        />
      </StreamLayout>
    </PageContainer>
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