import React, { useState } from 'react';
import styled from 'styled-components';
import StreamHeader from './components/StreamHeader';
import StreamPreview from './components/StreamPreview';
import PanelControl from './components/PanelControl';
import ChattingSection from './components/ChattingSection';
import { useStreaming } from '../hooks/useStreaming';



interface AudioSource {
  id: string;
  name: string;
  level: number;
  muted: boolean;
}

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
    toggleSourceVisibility,
    startStreaming,
    stopStreaming
  } = useStreaming();
  
  const [streamTitle, setStreamTitle] = useState<string>('스트리머의 방송');

  const audioSources: AudioSource[] = [
    { id: 'mic', name: '마이크', level: -20, muted: false },
    { id: 'system', name: '시스템', level: -35, muted: false }
  ];

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
  
  const handleVolumeChange = (_sourceId: string, _level: number) => {
  };
  
  const handleSendMessage = (_message: string) => {
  };

  const handleAddScene = (name: string, selectedDevices?: string[]) => {
    addScene(name, selectedDevices);
  };

  const handleAddSource = (name: string, type: string, deviceId?: string) => {
    addSource(name, type as 'video' | 'audio' | 'image' | 'text', deviceId);
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
          />
          
          <PanelControl 
            scenes={scenes}
            sources={sources}
            audioSources={audioSources}
            onSceneChange={handleSceneChange}
            onSourceToggle={handleSourceToggle}
            onVolumeChange={handleVolumeChange}
            onAddScene={handleAddScene}
            onAddSource={handleAddSource}
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