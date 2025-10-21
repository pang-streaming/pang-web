import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Video } from './components/video';
import { StreamSetting } from './components/streamSetting';
import { useCanvasSize } from '../../../features/canvas/hooks/useCanvasSize';
import { useScreenManagement } from '../../../features/canvas/hooks/useScreenManagement';
import { AddSourceModal } from '../../../features/modal/components/AddSourceModal';
import { useAddSourceModal } from '../../../features/modal/hooks/useAddSourceModal';
import { useStreamTitleModal } from '../../../features/modal/hooks/useStreamTitleModal';
import { type Screen } from '../../../features/canvas/constants/canvas-constants';
import { useAudioStore } from '../../../features/audio/stores/useAudioStore';
import { fetchStreamKey, createStreamKey, fetchMyInfo, fetchStreamStatus, Category } from '../../../features/stream/api';
import { useQuery } from '@tanstack/react-query';
import { Chat } from './components/chat';
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import { StreamTitleModal } from '../../../features/modal/components/StreamTitleModal';

const StreamingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSize = useCanvasSize(containerRef);
  const { screens, setScreens, addVideoScreen, addScreen, clearScreens } = useScreenManagement(canvasSize);
  
  const modal = useAddSourceModal();
  const streamTitleModal = useStreamTitleModal();
  const { removeAudioTrack } = useAudioStore();
  
  const [vrmUrl, setVrmUrl] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(null);
  const [isVTuberEnabled, setIsVTuberEnabled] = useState(false);
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [isLoadingKey, setIsLoadingKey] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  

  const { data: myInfo, isLoading: isLoadingMyInfo } = useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const { data: streamStatus, isLoading: isLoadingStreamStatus } = useQuery({
    queryKey: ['streamStatus'],
    queryFn: fetchStreamStatus,
    staleTime: 1000 * 10, // 10초마다 상태 확인
    refetchInterval: 1000 * 10, // 10초마다 자동 갱신
    retry: (failureCount, error: any) => {
      // 404 에러는 방송 중이 아니라는 의미이므로 재시도하지 않음
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });


  useEffect(() => {
    const initializeStreamKey = async () => {
      try {
        setIsLoadingKey(true);
        const response = await fetchStreamKey();
        
        if (response.data?.streamKey) {
          console.log('스트림 키 불러오기 성공:', response.data.streamKey);
          setStreamKey(response.data.streamKey);
        } else {
          console.log('스트림 키가 없어서 새로 발급합니다.');
          const createResponse = await createStreamKey();
          if (createResponse.data?.streamKey) {
            console.log('스트림 키 발급 성공:', createResponse.data.streamKey);
            setStreamKey(createResponse.data.streamKey);
          }
        }
      } catch (error: any) {
        console.error('스트림 키 불러오기 실패:', error);
        
        if (error.response?.status === 404 || error.response?.status === 400) {
          try {
            console.log('키가 없어서 새로 발급을 시도합니다.');
            const createResponse = await createStreamKey();
            if (createResponse.data?.streamKey) {
              console.log('스트림 키 발급 성공:', createResponse.data.streamKey);
              setStreamKey(createResponse.data.streamKey);
            }
          } catch (createError) {
            console.error('스트림 키 발급 실패:', createError);
            alert('스트림 키 발급에 실패했습니다. 페이지를 새로고침해주세요.');
          }
        }
      } finally {
        setIsLoadingKey(false);
      }
    };

    initializeStreamKey();
  }, []);

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

  const handleTitleClick = () => {
    // 방송 중일 때만 모달 열기
    if (streamStatus?.data?.status === 'LIVE') {
      streamTitleModal.openModal();
    } else {
      alert('방송 중일 때만 방송 설정을 변경할 수 있습니다.');
    }
  };

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const handleHashtagsChange = (newHashtags: string[]) => {
    setHashtags(newHashtags);
  };

  if (isLoadingKey) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingText>스트림 키를 불러오는 중...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (!streamKey) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingText>스트림 키를 불러올 수 없습니다.</LoadingText>
          <RetryButton onClick={() => window.location.reload()}>
            새로고침
          </RetryButton>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DashboardContainer>
	      <VideoWrapper ref={containerRef}>
		      <Video
			      canvasSize={canvasSize}
			      containerRef={containerRef}
			      screens={screens}
			      setScreens={setScreens}
			      vrmUrl={vrmUrl}
			      selectedDevice={selectedDevice}
			      isVTuberEnabled={isVTuberEnabled}
            streamKey={streamKey}
            title={myInfo?.data?.nickname ?? ''}
            onTitleClick={handleTitleClick}
            titleChild={
              <>
              <HeaderLeft>
                <CategorySection>
                  {selectedCategory ? (
                    <>
                      {selectedCategory.postImage && (
                        <CategoryImage src={selectedCategory.postImage} alt={selectedCategory.name} />
                      )}
                      <CategoryName>{selectedCategory.name}</CategoryName>
                    </>
                  ) : (
                    <CategoryPlaceholder>카테고리 미선택</CategoryPlaceholder>
                  )}
                </CategorySection>
                <StreamTitle onClick={streamStatus?.data?.status === 'LIVE' ? handleTitleClick : undefined} $clickable={streamStatus?.data?.status === 'LIVE'}>
                  {myInfo?.data?.nickname}님의 방송 ✎
                </StreamTitle>
              </HeaderLeft>
            </>
            }
		      />
	      </VideoWrapper>
        <ChatSection>
    
          {myInfo?.data && (
          //   <UserInfoBox>
          //     <InfoLabel>사용자 정보</InfoLabel>
          //     <InfoRow>
          //       <InfoKey>닉네임:</InfoKey>
          //       <InfoValue>{myInfo.data.nickname}</InfoValue>
          //     </InfoRow>
          //     <InfoRow>
          //       <InfoKey>유저네임:</InfoKey>
          //       <InfoValue>{myInfo.data.username}</InfoValue>
          //     </InfoRow>
          //     <InfoRow>
          //       <InfoKey>커뮤니티 ID:</InfoKey>
          //       <InfoValue>{myInfo.data.communityId || '없음'}</InfoValue>
          //     </InfoRow>
          //   </UserInfoBox>
          // )}

          // {streamKey && (
          //   <StreamKeyInfo>
          //     <StreamKeyLabel>스트림 키:</StreamKeyLabel>
          //     <StreamKeyValue>{streamKey}</StreamKeyValue>
          //   </StreamKeyInfo>
          // )}
           
            <Chat roomId={myInfo?.data?.username ?? ''} />
          )}
        </ChatSection>
      </DashboardContainer>
      
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

      <StreamTitleModal
        isOpen={streamTitleModal.isOpen}
        onClose={streamTitleModal.closeModal}
        currentTitle={streamTitleModal.currentTitle}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        hashtags={hashtags}
        onHashtagsChange={handleHashtagsChange}
        streamKey={streamKey || ''}
        streamType={streamStatus?.data?.streamType || 'WHIP'}
        onSuccess={() => {
          // 성공 시 추가 처리 로직
          console.log('스트리밍 정보가 성공적으로 업데이트되었습니다.');
        }}
      />
    </PageContainer>
  );
};

export default StreamingPage;

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
  max-height: calc(100vh - 200px);
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const UserInfoBox = styled.div`
  margin-top: 15px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoLabel = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: bold;
  margin-bottom: 5px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const InfoKey = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.normal};
  word-break: break-word;
  text-align: right;
`;

const StreamKeyInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StreamKeyLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-weight: bold;
`;

const StreamKeyValue = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.normal};
  word-break: break-all;
  font-family: monospace;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 4px;
`;

const StreamingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategorySection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 8px;
  max-width: 200px;
`;

const CategoryImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
`;

const CategoryName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CategoryPlaceholder = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const StreamTitle = styled.h3<{ $clickable?: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  transition: color 0.2s;
  
  ${({ $clickable, theme }) => $clickable && `
    &:hover {
      color: ${theme.colors.primary.normal};
    }
  `}
`;

const StartButton = styled.button<{isStarted: boolean}>`
  padding: 8px;
  border-radius: ${({theme}) => theme.borders.small};
  color: ${({theme}) => theme.colors.text.normal};
  background-color: ${({theme, isStarted}) => isStarted ? theme.colors.primary.normal : theme.colors.content.normal};
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({theme, isStarted}) => isStarted ? theme.colors.primary.dark : theme.colors.content.dark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;