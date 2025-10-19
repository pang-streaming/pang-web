import React, {useState} from "react";
import styled from "styled-components";
import { VolumeMixer } from "./volumeMixer";
import {useDragAndDrop} from "@/pages/streaming/hooks/useDragAndDrop";
import {useAudioStore} from "@/features/audio/stores/useAudioStore";

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
}

export const StreamSetting = ({ onVideoAddButtonClick }: StreamProps) => {
  const [screenSections, setScreenSections] = useState<string[]>(["섹션1"]);
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
	
  // Use custom hooks for drag and drop
  const screenDragState = useDragAndDrop(screenSections, setScreenSections);
  const audioDragState = useDragAndDrop(audioSections, setAudioSections);

  return (
    <SettingContainer>
      <SectionSetContainer>
	      <SectionsRenderer items={screenSections} dragState={screenDragState} />
      </SectionSetContainer>

      <ScreenSetContainer>
	      <button onClick={onVideoAddButtonClick}>+</button>
	      <SectionsRenderer items={audioSections} dragState={audioDragState} />
	      <button onClick={addMicrophoneAudio}>마이크 추가</button>
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
  max-width: 1200px;
  border-radius: 14px;
  background-color: ${({theme}) => theme.colors.background.normal};
  overflow: hidden;
  gap: 10px;
  padding: 16px;
`;

const BaseSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({theme}) => theme.colors.content.normal};
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
  box-shadow: ${({ isDragging }) => (isDragging ? "0 8px 16px rgba(0,0,0,0.3)" : "none")};

  font-size: 15px;
  color: ${({theme}) => theme.colors.text.normal};
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
	  cursor: grab;
  }
`;

const VolumeMixerContainer = styled(BaseSectionContainer)`
  flex: 1.5;
  overflow-y: auto;
`;