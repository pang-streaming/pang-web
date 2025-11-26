import React, { useRef, useState, useEffect } from 'react';

import { StreamSetting } from './components/streamSetting';
import { useCanvasSize } from '@/features/canvas/hooks/useCanvasSize';
import { useScreenManagement } from '@/features/canvas/hooks/useScreenManagement';
import { AddSourceModal } from '@/features/modal/components/AddSourceModal';
import { useAddSourceModal } from '@/features/modal/hooks/useAddSourceModal';
import { useStreamTitleModal } from '@/features/modal/hooks/useStreamTitleModal';
import { type Screen } from '@/features/canvas/constants/canvas-constants';
import { useAudioStore } from '@/features/audio/stores/useAudioStore';
import { Category } from '@/features/stream/api';
import { useQueryClient } from '@tanstack/react-query';
import { useMyInfo, useStreamStatus, useStreamKeyInitializer } from '../hooks/useStreamQueries';
import { Chat } from './components/chat';
import { StreamTitleModal } from '@/features/modal/components/StreamTitleModal';
import { Video } from './components/video';
import { StreamingSettingsModal } from './components/StreamingSettingsModal';
import * as S from './styles';

const StreamingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSize = useCanvasSize();
  const { screens, setScreens, addScreen } =
    useScreenManagement(canvasSize);

  const modal = useAddSourceModal();
  const streamTitleModal = useStreamTitleModal();
  const { removeAudioTrack } = useAudioStore();

  const [vrmUrl, setVrmUrl] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(
    null
  );
  const [isVTuberEnabled, setIsVTuberEnabled] = useState(false);
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [whipUrl, setWhipUrl] = useState<string | null>(null);
  const [isLoadingKey, setIsLoadingKey] = useState(true);
  const [hasInitializedVRM, setHasInitializedVRM] = useState(false);
  const [hasInitializedBackground, setHasInitializedBackground] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isStreamingSettingsOpen, setIsStreamingSettingsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: myInfo,
    isLoading: isLoadingMyInfo,
  } = useMyInfo();

  const { data: streamStatus } = useStreamStatus(streamKey, isLoadingKey);

  useStreamKeyInitializer(myInfo, isLoadingMyInfo, setStreamKey, setWhipUrl, setIsLoadingKey);

  // 기본 배경 이미지 추가 (한 번만)
  useEffect(() => {
    if (
      screens.length === 0 &&
      !isLoadingKey &&
      streamKey &&
      !hasInitializedBackground
    ) {
      setHasInitializedBackground(true);
      const img = new Image();
      img.src = "/example/background.png";
      img.onload = () => {
        const defaultBackground: Screen = {
          id: Date.now(),
          type: "image",
          source: img,
          x: 0,
          y: 0,
          width: canvasSize.width,
          height: canvasSize.height,
        };
        addScreen(defaultBackground);
      };
      img.onerror = () => {
        console.warn(
          "기본 배경 이미지를 불러올 수 없습니다. /example/background.png 파일을 추가해주세요."
        );
      };
    }
  }, [
    screens.length,
    isLoadingKey,
    streamKey,
    canvasSize,
    addScreen,
    hasInitializedBackground,
  ]);

  useEffect(() => {
    if (!isLoadingKey && streamKey && !hasInitializedVRM) {
      const initializeDefaultVRM = async () => {
        setHasInitializedVRM(true);

        try {
          // 카메라 사용 가능 여부 확인
          const devices = await navigator.mediaDevices.enumerateDevices();
          const hasCamera = devices.some(
            (device) => device.kind === "videoinput"
          );

          if (!hasCamera) {
            console.warn(
              "카메라가 감지되지 않아 VRM 아바타 기능을 제공하지 않습니다."
            );
            alert(
              "카메라가 발견되지 않아 버추얼 아바타 제공이 중단됩니다.\n\n버추얼 아바타 기능을 사용하시려면 카메라를 연결한 후 페이지를 새로고침해주세요.\n\n※ 카메라 없이도 일반 방송은 가능합니다."
            );
            return;
          }

          // 카메라 권한 요청
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });

          // 권한을 받았으면 스트림 중지 (트래킹용으로만 사용할 것이므로)
          stream.getTracks().forEach((track) => track.stop());

          // 카메라 기기 목록 가져오기
          const updatedDevices =
            await navigator.mediaDevices.enumerateDevices();
          const videoDevices = updatedDevices.filter(
            (device) => device.kind === "videoinput"
          );

          if (videoDevices.length > 0) {
            setVrmUrl("/example/avatar.vrm");
            setSelectedDevice(videoDevices[0]);
            setIsVTuberEnabled(true);
          }
        } catch (error: any) {
          console.warn("카메라 권한 요청 실패:", error);
        }
      };

      initializeDefaultVRM();
    }
  }, [isLoadingKey, streamKey, hasInitializedVRM]);

  const handleAddScreen = (screen: Screen) => {
    addScreen(screen);
  };

  const handleAddVTuber = (vrmUrl: string | null, device: MediaDeviceInfo) => {
    setVrmUrl(vrmUrl);
    setSelectedDevice(device);
    setIsVTuberEnabled(true);
  };

  const handleRemoveScreen = (screenId: number) => {
    setScreens((prev) => {
      const screen = prev.find((s) => s.id === screenId);
      if (screen) {
        if (screen.type === "canvas") {
          setIsVTuberEnabled(false);
          setVrmUrl(null);
          setSelectedDevice(null);
        }
        if (screen.stream) {
          const audioTrack = screen.stream.getAudioTracks()[0];
          if (audioTrack) {
            removeAudioTrack(audioTrack.id);
          }
          screen.stream.getVideoTracks().forEach((track) => track.stop());
        }
      }
      return prev.filter((s) => s.id !== screenId);
    });
  };

  const handleTitleClick = () => {
    // 방송 중일 때만 모달 열기
    if (streamStatus?.data?.status === "LIVE") {
      streamTitleModal.openModal();
    } else {
      alert("방송 중일 때만 방송 설정을 변경할 수 있습니다.");
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
                <S.CategoryImage
                  src={selectedCategory.postImage}
                  alt={selectedCategory.name}
                />
              )}
              <S.CategoryName>{selectedCategory.name}</S.CategoryName>
            </>
          ) : (
            <S.CategoryPlaceholder>카테고리 미선택</S.CategoryPlaceholder>
          )}
        </S.CategorySection>
        {streamStatus?.data?.status === "LIVE" ? (
          <S.StreamTitle
            onClick={
              streamStatus?.data?.status === "LIVE"
                ? handleTitleClick
                : undefined
            }
            $clickable={streamStatus?.data?.status === "LIVE"}
          >
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
        streamKey={streamKey || ""}
        streamType={streamStatus?.data?.streamType || "WHIP"}
        onSuccess={() => {}}
      />

      <StreamingSettingsModal
        isOpen={isStreamingSettingsOpen}
        onClose={handleStreamingSettingsClose}
        currentStreamType={streamStatus?.data?.streamType || "WHIP"}
        streamKey={streamKey || ""}
        queryClient={queryClient}
        streamStatus={streamStatus}
      />
    </S.PageContainer>
  );
};

export default StreamingPage;
