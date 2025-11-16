import React, { useRef, useState, useEffect } from 'react';

import { StreamSetting } from './components/streamSetting';
import { useCanvasSize } from '@/features/canvas/hooks/useCanvasSize';
import { useScreenManagement } from '@/features/canvas/hooks/useScreenManagement';
import { AddSourceModal } from '@/features/modal/components/AddSourceModal';
import { useAddSourceModal } from '@/features/modal/hooks/useAddSourceModal';
import { useStreamTitleModal } from '@/features/modal/hooks/useStreamTitleModal';
import { type Screen } from '@/features/canvas/constants/canvas-constants';
import { useAudioStore } from '@/features/audio/stores/useAudioStore';
import { fetchStreamKey, createStreamKey, fetchMyInfo, fetchStreamStatus, Category, updateStream } from '@/features/stream/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Chat } from './components/chat';
import { StreamTitleModal } from '@/features/modal/components/StreamTitleModal';
import { Video } from './components/\bvideo';
import { StreamingSettingsModal } from './components/StreamingSettingsModal';
import * as S from './styles';

const StreamingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSize = useCanvasSize();
  const { screens, setScreens, addVideoScreen, addScreen, clearScreens } = useScreenManagement(canvasSize);
  
  const modal = useAddSourceModal();
  const streamTitleModal = useStreamTitleModal();
  const { removeAudioTrack } = useAudioStore();
  
  const [vrmUrl, setVrmUrl] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(null);
  const [isVTuberEnabled, setIsVTuberEnabled] = useState(false);
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [whipUrl, setWhipUrl] = useState<string | null>(null);
  const [isLoadingKey, setIsLoadingKey] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isStreamingSettingsOpen, setIsStreamingSettingsOpen] = useState(false);
  const queryClient = useQueryClient();
 
  const { data: myInfo, isLoading: isLoadingMyInfo, refetch: refetchMyInfo } = useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const { data: streamStatus, isLoading: isLoadingStreamStatus } = useQuery({
    queryKey: ['streamStatus'],
    queryFn: fetchStreamStatus,
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
    enabled: !isLoadingKey && !!streamKey,
    retry: (failureCount, error: any) => {
      
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });


  useEffect(() => {
    if (isLoadingMyInfo || !myInfo?.data) {
      return;
    }

    const initializeStreamKey = async () => {
      try {
        setIsLoadingKey(true);
        console.log('STREAMER가 아니므로 스트림 키를 발급합니다.');
        const createResponse = await createStreamKey();
        console.log('스트림 키 발급 성공:', createResponse.data.key);
        setStreamKey(createResponse.data.key);
				setWhipUrl(createResponse.data.webRtcUrl);
      } catch (error: any) {
        console.error('스트림 키 처리 실패:', error);
        alert('스트림 키 처리 중 오류가 발생했습니다.');
      } finally {
        setIsLoadingKey(false);
      }
    };

    initializeStreamKey();
  }, [myInfo, isLoadingMyInfo, refetchMyInfo]);

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

  const handleStreamingSettingsClick = () => {
    setIsStreamingSettingsOpen(true);
  };

  const handleStreamingSettingsClose = () => {
    setIsStreamingSettingsOpen(false);
  };

  // titleChild를 별도 변수로 분리하여 스코프 문제 해결
  const titleChildContent = (
    <>
      <S.HeaderLeft>
        <S.CategorySection>
          {selectedCategory ? (
            <>
              {selectedCategory.postImage && (
                <S.CategoryImage src={selectedCategory.postImage} alt={selectedCategory.name} />
              )}
              <S.CategoryName>{selectedCategory.name}</S.CategoryName>
            </>
          ) : (
            <S.CategoryPlaceholder>카테고리 미선택</S.CategoryPlaceholder>
          )}
        </S.CategorySection>
        {streamStatus?.data?.status === 'LIVE' ? 
          (<S.StreamTitle onClick={streamStatus?.data?.status === 'LIVE' ? handleTitleClick : undefined} $clickable={streamStatus?.data?.status === 'LIVE'}>
            {streamStatus?.data?.title}
          </S.StreamTitle>
        ) : (
          <S.StreamTitle>방송 대시보드</S.StreamTitle>
        )}
        <S.StatusIndicator $isLive={streamStatus?.data?.status === "LIVE"}>
          <S.StatusDot $isLive={streamStatus?.data?.status === "LIVE"} />
        </S.StatusIndicator>

        <S.StreamInfo>
          <S.StreamType>
            {streamStatus?.data?.streamType === "RTMP"
              ? "외부에서 방송"
              : "팡 스트리밍을 통해 방송"}
          </S.StreamType>
        </S.StreamInfo>
      </S.HeaderLeft>
      <S.HeaderRight>
        <S.StreamKeyButton
          onClick={handleStreamingSettingsClick}
          disabled={isLoadingKey}
        >
          방송 설정
        </S.StreamKeyButton>
      </S.HeaderRight>
    </>
  );

  if (isLoadingKey) {
    return (
      <S.PageContainer>
        <S.LoadingContainer>
          <S.LoadingText>스트림 키를 불러오는 중...</S.LoadingText>
        </S.LoadingContainer>
      </S.PageContainer>
    );
  }

  if (!streamKey) {
    return (
      <S.PageContainer>
        <S.LoadingContainer>
          <S.LoadingText>스트림 키를 불러올 수 없습니다.</S.LoadingText>
          <S.RetryButton onClick={() => window.location.reload()}>
            새로고침
          </S.RetryButton>
        </S.LoadingContainer>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.DashboardContainer>
        <S.VideoWrapper ref={containerRef}>
          <Video
            canvasSize={canvasSize}
            containerRef={containerRef}
            screens={screens}
            setScreens={setScreens}
            vrmUrl={vrmUrl}
            selectedDevice={selectedDevice}
            username={myInfo?.data?.username ?? ""}
            whipUrl={whipUrl}
            isVTuberEnabled={isVTuberEnabled}
            streamKey={streamKey}
            title={myInfo?.data?.nickname ?? ""}
            onTitleClick={handleTitleClick}
            titleChild={titleChildContent}
          />
        </S.VideoWrapper>
        <S.ChatSection>
          {myInfo?.data && <Chat roomId={myInfo?.data?.username ?? ""} />}
        </S.ChatSection>
      </S.DashboardContainer>
      
      <S.StreamSettingSection>
	      <StreamSetting
		      onVideoAddButtonClick={modal.openModal}
		      screens={screens}
		      setScreens={setScreens}
		      onRemoveScreen={handleRemoveScreen}
	      />
      </S.StreamSettingSection>

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

      <StreamingSettingsModal
        isOpen={isStreamingSettingsOpen}
        onClose={handleStreamingSettingsClose}
        currentStreamType={streamStatus?.data?.streamType || 'WHIP'}
        streamKey={streamKey || ''}
        queryClient={queryClient}
        streamStatus={streamStatus}
      />
    </S.PageContainer>
  );
};

export default StreamingPage;