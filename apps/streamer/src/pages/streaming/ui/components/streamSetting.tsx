import React from "react";
import styled from "styled-components";
import { VolumeMixer } from "@/pages/streaming/ui/components/volumeMixer";
import { useAudioStore } from "@/features/audio/stores/useAudioStore";
import { type Screen } from "@/features/canvas/constants/canvas-constants";
import { ScreenListItem } from "@/features/canvas/components/ScreenListItem";
import { useScreenDragAndDrop } from "@/features/canvas/hooks/useScreenDragAndDrop";

interface StreamProps {
	onVideoAddButtonClick: () => void;
  screens: Screen[];
  setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
  onRemoveScreen: (screenId: number) => void;
}

export const StreamSetting = ({ 
  onVideoAddButtonClick, 
  screens, 
  setScreens,
  onRemoveScreen 
}: StreamProps) => {
  
	const { addAudioTrack } = useAudioStore();
	
	const addMicrophoneAudio = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const audioTrack = stream.getAudioTracks()[0];
			if (audioTrack) {
			  addAudioTrack(audioTrack, 'microphone', audioTrack.label || 'Microphone');
			}
		} catch (err) {
			console.error("마이크 접근 실패:", err);
			alert("마이크 사용 권한이 필요합니다.");
		}
	};
	
  const screenDragState = useScreenDragAndDrop(screens, setScreens);

  return (
    <SettingContainer>
      <SectionSetContainer>
        <SectionTitle>화면 소스</SectionTitle>
        <AddButton onClick={onVideoAddButtonClick}>+ 소스 추가</AddButton>
        {[...screens].reverse().map((screen, reverseIndex) => {
          const index = screens.length - 1 - reverseIndex;
          return (
            <ScreenListItem
              key={screen.id}
              screen={screen}
              index={index}
              isDragging={screenDragState.draggingIndex === index}
              onDragStart={() => screenDragState.handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault();
                screenDragState.handleDragOver(index);
              }}
              onDragEnd={screenDragState.handleDragEnd}
              onRemove={() => onRemoveScreen(screen.id)}
            />
          );
        })}
        {screens.length === 0 && (
          <EmptyMessage>소스를 추가해보세요</EmptyMessage>
        )}
      </SectionSetContainer>

      <ScreenSetContainer>
        <SectionTitle>오디오 소스</SectionTitle>
	      <AddButton onClick={addMicrophoneAudio}>+ 마이크 추가</AddButton>
      </ScreenSetContainer>

      <VolumeMixerContainer>
        <VolumeMixer />
      </VolumeMixerContainer>
    </SettingContainer>
  );
};

const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 14px;
  background-color: ${({theme}) => theme.colors.background.normal};
  gap: 12px;
  padding: 12px;
  min-height: 200px;
`;

const BaseSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({theme}) => theme.colors.content.normal};
  min-width: 0;
`;

const SectionSetContainer = styled(BaseSectionContainer)``;

const ScreenSetContainer = styled(BaseSectionContainer)``;

const VolumeMixerContainer = styled(BaseSectionContainer)`
  flex: 1.5;
`;

const SectionTitle = styled.h4`
  padding-left: 12px;
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};
  border: 2px dashed ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    border-color: ${({ theme }) => theme.colors.text.normal};
  }
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.9rem;
  font-style: italic;
`;