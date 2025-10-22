import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Video } from './components/video';
import { StreamSetting } from './components/streamSetting';
import { useCanvasSize } from '../../../features/canvas/hooks/useCanvasSize';
import { useScreenManagement } from '../../../features/canvas/hooks/useScreenManagement';
import { AddSourceModal } from '../../../features/modal/components/AddSourceModal';
import { useAddSourceModal } from '../../../features/modal/hooks/useAddSourceModal';
import { useStreamTitleModal } from '../../../features/modal/hooks/useStreamTitleModal';
import { type Screen } from '../../../features/canvas/constants/canvas-constants';
import { useAudioStore } from '../../../features/audio/stores/useAudioStore';
import { fetchStreamKey, createStreamKey, fetchMyInfo, fetchStreamStatus, Category, updateStream } from '../../../features/stream/api';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
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
    if (isLoadingMyInfo || !myInfo?.data) {
      return;
    }

    const initializeStreamKey = async () => {
      try {
        setIsLoadingKey(true);
        const userRole = myInfo.data.role;
        console.log('내 정보 로드 완료. Role:', userRole);
        
        if (userRole !== 'STREAMER') {
          console.log('STREAMER가 아니므로 스트림 키를 발급합니다.');
          const createResponse = await createStreamKey({ 'stream-type': 'WHIP' });
          console.log('스트림 키 발급 성공:', createResponse.data.streamKey);
          setStreamKey(createResponse.data.streamKey);
          
          await refetchMyInfo();
          } else {
            console.log('STREAMER이므로 스트림 키를 조회합니다.');
            const response = await fetchStreamKey();
            
            if (response.data?.streamKey) {
              console.log('스트림 키 조회 성공:', response.data.streamKey);
              setStreamKey(response.data.streamKey);
            } else {
              console.log('응답에 스트림 키가 없습니다.');
              alert('스트림 키를 찾을 수 없습니다.');
            }
          }
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

  const handleRegenerateStreamKey = async () => {
    if (streamStatus?.data?.status === 'LIVE') {
      alert('방송 중에는 스트림키를 변경할 수 없습니다.');
      return;
    }

    if (!confirm('스트림키를 새로 생성하시겠습니까? 기존 키는 더 이상 사용할 수 없습니다.')) {
      return;
    }

    try {
      setIsLoadingKey(true);
      const response = await createStreamKey({ 'stream-type': 'WHIP' });
      if (response.data?.streamKey) {
        setStreamKey(response.data.streamKey);
        alert('새로운 스트림키가 생성되었습니다.');
      }
    } catch (error) {
      console.error('스트림키 생성 실패:', error);
      alert('스트림키 생성에 실패했습니다.');
    } finally {
      setIsLoadingKey(false);
    }
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
        {streamStatus?.data?.status === 'LIVE' ? 
          (<StreamTitle onClick={streamStatus?.data?.status === 'LIVE' ? handleTitleClick : undefined} $clickable={streamStatus?.data?.status === 'LIVE'}>
            {streamStatus?.data?.title}
          </StreamTitle>) 
          : 
          (<StreamTitle>방송 대시보드</StreamTitle>)
        }
        
      </HeaderLeft>
    </>
  );

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
      <StreamBottomSection>
        <StatusSection>
          <StatusIndicator $isLive={streamStatus?.data?.status === 'LIVE'}>
            <StatusDot $isLive={streamStatus?.data?.status === 'LIVE'} />
            <StatusText>
              {streamStatus?.data?.status === 'LIVE' ? 'LIVE' : 'OFFLINE'}
            </StatusText>
          </StatusIndicator>
          
          <StreamInfo>
            <StreamType>
              {streamStatus?.data?.streamType === 'RTMP' ? '외부에서 방송' : '팡 스트리밍을 통해 방송'}
            </StreamType>
          </StreamInfo>
        </StatusSection>
        
        <ActionSection>
           <StreamKeyButton onClick={handleStreamingSettingsClick} disabled={isLoadingKey}>
             방송 설정
           </StreamKeyButton>
        </ActionSection>
      </StreamBottomSection>

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
			      titleChild={titleChildContent}
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

      <StreamingSettingsModal
        isOpen={isStreamingSettingsOpen}
        onClose={handleStreamingSettingsClose}
        currentStreamType={streamStatus?.data?.streamType || 'WHIP'}
        streamKey={streamKey || ''}
        queryClient={queryClient}
        streamStatus={streamStatus}
      />
    </PageContainer>
  );
};

export default StreamingPage;

const StreamBottomSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  padding-top:0;
  padding-bottom:5px;
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

const StatusIndicator = styled.div<{ $isLive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  
  background-color: ${({ theme }) => theme.colors.background.normal};
  
`;

const StatusDot = styled.div<{ $isLive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isLive }) => $isLive ? '#22c55e' : '#6b7280'};
  animation: ${({ $isLive }) => $isLive ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const StatusText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const StreamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StreamType = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-weight: 500;
`;

const StreamKeyDisplay = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-family: monospace;
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: 4px 8px;
  border-radius: 4px;
  word-break: break-all;
`;

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

const StreamKeyButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.borders.small};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.text.subtitle};
    cursor: not-allowed;
  }
`;

// StreamingSettingsModal 컴포넌트
interface StreamingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreamType: 'RTMP' | 'WHIP';
  streamKey: string;
  queryClient: any;
  streamStatus: any;
}

const StreamingSettingsModal: React.FC<StreamingSettingsModalProps> = ({
  isOpen,
  onClose,
  currentStreamType,
  streamKey,
  queryClient,
  streamStatus
}) => {
  const [selectedType, setSelectedType] = useState<'RTMP' | 'WHIP'>(currentStreamType);
  const [isClosing, setIsClosing] = useState(false);

  // currentStreamType이 변경되면 selectedType도 업데이트
  useEffect(() => {
    setSelectedType(currentStreamType);
  }, [currentStreamType]);

  // 스트림 타입 변경 mutation
  const updateStreamTypeMutation = useMutation({
    mutationFn: (streamType: 'RTMP' | 'WHIP') => updateStream(streamKey, { 
      title: streamStatus?.data?.title || '', // 기존 제목 유지
      categoryId: streamStatus?.data?.categoryId || 0, // 기존 카테고리 유지
      tags: streamStatus?.data?.tags || [], // 기존 태그 유지
      streamType: streamType 
    }),
    onMutate: async (newStreamType) => {
      // 낙관적 업데이트: 서버 응답을 기다리지 않고 즉시 UI 업데이트
      await queryClient.cancelQueries({ queryKey: ['streamStatus'] });
      
      const previousStreamStatus = queryClient.getQueryData(['streamStatus']);
      
      queryClient.setQueryData(['streamStatus'], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          streamType: newStreamType
        }
      }));
      
      return { previousStreamStatus };
    },
    onError: (err, newStreamType, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousStreamStatus) {
        queryClient.setQueryData(['streamStatus'], context.previousStreamStatus);
      }
      console.error('스트림 타입 변경 실패:', err);
    },
    onSettled: () => {
      // 성공/실패 관계없이 최신 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ['streamStatus'] });
    },
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleTypeChange = (type: 'RTMP' | 'WHIP') => {
    setSelectedType(type);
    console.log(`방송 방식이 ${type === 'RTMP' ? '외부 송출 프로그램' : '팡 스트리머'}로 변경되었습니다.`);
  };

  const handleSave = () => {
    console.log(`방송 설정 저장: ${selectedType}`);
    
    // mutation 실행 (낙관적 업데이트 포함)
    updateStreamTypeMutation.mutate(selectedType, {
      onSuccess: () => {
        console.log('스트림 타입 변경 성공');
        handleClose();
      },
      onError: (error) => {
        console.error('스트림 타입 변경 실패:', error);
        alert('스트림 타입 변경에 실패했습니다.');
      }
    });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose} $isClosing={isClosing}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <ModalHeader>
          <ModalTitle>방송 설정</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <Form as="div">
            <FormGroup>
              <Label>방송 방식 선택</Label>
              <OptionContainer>
                <OptionButton
                  type="button"
                  $isSelected={selectedType === 'RTMP'}
                  onClick={() => handleTypeChange('RTMP')}
                >
                  <OptionIcon>📺</OptionIcon>
                  <OptionContent>
                    <OptionTitle>외부 송출 프로그램</OptionTitle>
                    <OptionDescription>OBS, XSplit 등 외부 프로그램 사용</OptionDescription>
                  </OptionContent>
                </OptionButton>

                <OptionButton
                  type="button"
                  $isSelected={selectedType === 'WHIP'}
                  onClick={() => handleTypeChange('WHIP')}
                >
                  <OptionIcon>🎮</OptionIcon>
                  <OptionContent>
                    <OptionTitle>팡 스트리머</OptionTitle>
                    <OptionDescription>팡 플랫폼 내장 스트리머 사용</OptionDescription>
                  </OptionContent>
                </OptionButton>
              </OptionContainer>
            </FormGroup>

            {selectedType === 'RTMP' && (
              <FormGroup>
                <Label>RTMP 설정 정보</Label>
                <InfoContainer>
                  <InfoItem>
                    <StreamingInfoLabel>서버 주소:</StreamingInfoLabel>
                    <StreamingInfoValue>
                      rtmp://{import.meta.env.VITE_RTMP_SERVER_URL || 'stream.pang.com'}:{import.meta.env.VITE_RTMP_SERVER_PORT || '1935'}
                    </StreamingInfoValue>
                    <CopyButton onClick={() => navigator.clipboard.writeText(
                      `rtmp://${import.meta.env.VITE_RTMP_SERVER_URL || 'stream.pang.com'}:${import.meta.env.VITE_RTMP_SERVER_PORT || '1935'}`
                    )}>
                      복사
                    </CopyButton>
                  </InfoItem>
                  <InfoItem>
                    <StreamingInfoLabel>스트림 키:</StreamingInfoLabel>
                    <StreamingInfoValue>{streamKey}</StreamingInfoValue>
                    <CopyButton onClick={() => navigator.clipboard.writeText(streamKey)}>
                      복사
                    </CopyButton>
                  </InfoItem>
                </InfoContainer>
              </FormGroup>
            )}

            {selectedType === 'WHIP' && (
              <FormGroup>
                <Label>팡 스트리머</Label>
                <InfoContainer>
                  <InfoText>
                    팡 스트리머를 사용하면 별도의 설정 없이 바로 방송을 시작할 수 있습니다.
                    브라우저에서 직접 스트리밍이 가능합니다.
                  </InfoText>
                </InfoContainer>
              </FormGroup>
            )}
            
            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose}>
                취소
              </CancelButton>
              <SaveButton 
                type="button" 
                onClick={handleSave}
                disabled={updateStreamTypeMutation.isPending}
              >
                {updateStreamTypeMutation.isPending ? '저장 중...' : '저장'}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// StreamingSettingsModal 스타일 컴포넌트들
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid ${({ $isSelected, theme }) => 
    $isSelected ? theme.colors.primary.normal : theme.colors.border.normal
  };
  border-radius: 12px;
  background-color: ${({ $isSelected, theme }) => 
    $isSelected ? 'rgba(59, 130, 246, 0.05)' : theme.colors.background.normal
  };
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    background-color: ${({ $isSelected, theme }) => 
      $isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'
    };
  }
`;

const OptionIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const OptionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const OptionDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StreamingInfoLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
  min-width: 80px;
`;

const StreamingInfoValue = styled.div`
  flex: 1;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-family: monospace;
  background-color: ${({ theme }) => theme.colors.background.normal};
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  word-break: break-all;
`;

const CopyButton = styled.button`
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark || '#1d4ed8'};
  }
`;

const InfoText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 1.5;
`;

// 모달 공통 스타일 컴포넌트들
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
`;

const ModalOverlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => $isClosing ? fadeOut : fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div<{ $isClosing?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: ${({ $isClosing }) => $isClosing ? slideOut : slideIn} 0.3s ease-out;
  transform-origin: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

const SaveButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.text.subtitle};
    cursor: not-allowed;
  }
`;

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