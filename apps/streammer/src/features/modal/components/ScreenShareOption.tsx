import React, { useState } from 'react';
import styled from 'styled-components';
import { type Screen, type CanvasSize } from "../../../features/canvas/constants/canvas-constants";
import { useAudioStore } from "../../../features/audio/stores/useAudioStore";

interface ScreenShareOptionProps {
  canvasSize: CanvasSize;
  onAddScreen: (screen: Screen) => void;
  onClose: () => void;
}

export const ScreenShareOption = ({
  canvasSize,
  onAddScreen,
  onClose,
}: ScreenShareOptionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addAudioTrack } = useAudioStore();

  const handleScreenShare = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920, max: 3840 },
          height: { ideal: 1080, max: 2160 },
          frameRate: { ideal: 30, max: 120 },
        },
        audio: true,
      });

      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        addAudioTrack(audioTrack, 'screen', 'Screen Audio');
      }

      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;

      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          video.play()
            .then(() => resolve())
            .catch((err) => {
              console.error('재생 실패:', err);
              resolve();
            });
        };
      });

      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const width = Math.min(640, canvasSize.width * 0.4);
      const height = width / videoAspectRatio;
      const x = Math.random() * (canvasSize.width - width);
      const y = Math.random() * (canvasSize.height - height);

      const screenObj: Screen = {
        id: Date.now(),
        type: 'video',
        source: video,
        stream: stream,
        x: x,
        y: y,
        width: width,
        height: height,
      };

      onAddScreen(screenObj);
      onClose();
    } catch (err) {
      const error = err as Error & { name?: string };
      console.error('화면 공유 실패:', err);
      if (error.name === 'NotAllowedError') {
        alert('화면 공유 권한이 거부되었습니다.');
      } else {
        alert('화면 공유에 실패했습니다: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OptionContainer>
      <Description>
        공유할 화면을 선택하세요. 확인을 누르면 화면 선택 다이얼로그가 표시됩니다.
      </Description>
      <ButtonGroup>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <ConfirmButton onClick={handleScreenShare} disabled={isLoading}>
          {isLoading ? '로딩 중...' : '화면 공유 시작'}
        </ConfirmButton>
      </ButtonGroup>
    </OptionContainer>
  );
};

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.95rem;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary || '#4CAF50'};
  color: black;


  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
