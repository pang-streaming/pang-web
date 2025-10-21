import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Video } from './components/video';
import { StreamSetting } from './components/streamSetting';
import { useCanvasSize } from '../../../features/canvas/hooks/useCanvasSize';
import { useScreenManagement } from '../../../features/canvas/hooks/useScreenManagement';
import { AddSourceModal } from '../../../features/modal/components/AddSourceModal';
import { useAddSourceModal } from '../../../features/modal/hooks/useAddSourceModal';
import { type Screen } from '../../../features/canvas/constants/canvas-constants';
import { useAudioStore } from '../../../features/audio/stores/useAudioStore';
import { fetchStreamKey, createStreamKey, fetchMyInfo } from '../../../features/stream/api';
import { useQuery } from '@tanstack/react-query';

const StreamingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSize = useCanvasSize(containerRef);
  const { screens, setScreens, addVideoScreen, addScreen, clearScreens } = useScreenManagement(canvasSize);
  
  const modal = useAddSourceModal();
  const { removeAudioTrack } = useAudioStore();
  
  const [vrmUrl, setVrmUrl] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(null);
  const [isVTuberEnabled, setIsVTuberEnabled] = useState(false);
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  // 내 정보 불러오기
  const { data: myInfo, isLoading: isLoadingMyInfo } = useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
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
			      viewers={123}
			      likes={456}
			      vrmUrl={vrmUrl}
			      selectedDevice={selectedDevice}
			      isVTuberEnabled={isVTuberEnabled}
		      />
	      </VideoWrapper>
        <ChatSection>
          <h2>채팅 영역</h2>
          
          {myInfo?.data && (
            <UserInfoBox>
              <InfoLabel>사용자 정보</InfoLabel>
              <InfoRow>
                <InfoKey>닉네임:</InfoKey>
                <InfoValue>{myInfo.data.nickname}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoKey>이메일:</InfoKey>
                <InfoValue>{myInfo.data.email}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoKey>커뮤니티 ID:</InfoKey>
                <InfoValue>{myInfo.data.communityId || '없음'}</InfoValue>
              </InfoRow>
            </UserInfoBox>
          )}

          {streamKey && (
            <StreamKeyInfo>
              <StreamKeyLabel>스트림 키:</StreamKeyLabel>
              <StreamKeyValue>{streamKey}</StreamKeyValue>
            </StreamKeyInfo>
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