import React, {useState} from "react";
import styled from "styled-components";
import { VolumeMixer } from "./volumeMixer";
import {useDragAndDrop} from "@/pages/streaming/hooks/useDragAndDrop";
import {useAudioStore} from "@/features/audio/stores/useAudioStore";
import { Screen } from "@/features/canvas/constants/canvas-constants";
import { ScreenListItem } from "@/features/canvas/components/ScreenListItem";
import { useScreenDragAndDrop } from "@/features/canvas/hooks/useScreenDragAndDrop";

interface DragState {
  draggingIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragOver: (index: number) => void;
  handleDragEnd: () => void;
}

interface SectionProps {
  section: string;
  index: number;
  isDragging: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

// Memoized section component
const DraggableSectionItem = React.memo<SectionProps>(({
  section,
  isDragging,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => (
  <DraggableSection
    draggable
    isDragging={isDragging}
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDragEnd={onDragEnd}
  >
    <label>{section}</label>
  </DraggableSection>
));

// Memoized sections renderer
const SectionsRenderer = React.memo<{
  items: string[];
  dragState: DragState;
}>(({ items, dragState }) => {
  const { draggingIndex, handleDragStart, handleDragOver, handleDragEnd } = dragState;
	
  return (
    <>
      {items.map((section, index) => (
        <DraggableSectionItem
	        key={section}
	        section={section}
	        index={index}
	        isDragging={draggingIndex === index}
	        onDragStart={() => handleDragStart(index)}
	        onDragOver={(e) => {
		        e.preventDefault();
		        handleDragOver(index);
	        }}
	        onDragEnd={handleDragEnd}
        />
      ))}
    </>
  );
});

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
  const [audioSections, setAudioSections] = useState<string[]>(["구글"]);
	const { addAudioTrack } = useAudioStore();
	
	const addMicrophoneAudio = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const audioTrack = stream.getAudioTracks()[0];
			if (audioTrack) {
			  addAudioTrack(audioTrack, 'microphone', audioTrack.label || 'Microphone');
			  setAudioSections(prev => [...prev, '마이크']);
			}
		} catch (err) {
			console.error("마이크 접근 실패:", err);
			alert("마이크 사용 권한이 필요합니다.");
		}
	};
	
  const screenDragState = useScreenDragAndDrop(screens, setScreens);
  const audioDragState = useDragAndDrop(audioSections, setAudioSections);

  return (
    <SettingContainer>
      <SectionSetContainer>
        <SectionTitle>화면 소스</SectionTitle>
        <AddButton onClick={onVideoAddButtonClick}>+ 소스 추가</AddButton>
        {screens.map((screen, index) => (
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
        ))}
        {screens.length === 0 && (
          <EmptyMessage>소스를 추가해보세요</EmptyMessage>
        )}
      </SectionSetContainer>

      <ScreenSetContainer>
        <SectionTitle>오디오 소스</SectionTitle>
	      <SectionsRenderer items={audioSections} dragState={audioDragState} />
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

const DraggableSection = styled.div<{ isDragging?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background-color: ${({ theme, isDragging}) => isDragging ? theme.colors.hover.normal : theme.colors.content.dark};
  border-radius: ${({theme}) => theme.borders.large};
  margin-bottom: 6px;

  font-size: ${({theme}) => theme.font.medium};
  color: ${({theme}) => theme.colors.text.normal};
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
	  cursor: grab;
  }
`;

const VolumeMixerContainer = styled(BaseSectionContainer)`
  flex: 1.5;
`;

const SectionTitle = styled.h4`
  padding-left: 12px;
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