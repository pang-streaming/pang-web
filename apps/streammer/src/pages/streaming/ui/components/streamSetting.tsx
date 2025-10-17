import React, { useState } from "react";
import styled from "styled-components";
import { VolumeMixer } from "./volumeMixer";

export const StreamSetting = () => {
  const [screenSections, setScreenSections] = useState<string[]>(["section1", "section2", "section3", "section4"]);
  const [audioSections, setAudioSections] = useState<string[]>(["section1", "section2", "section3", "section4"]);

  // 섹션별 독립 dragging state
  const [screenDraggingIndex, setScreenDraggingIndex] = useState<number | null>(null);
  const [audioDraggingIndex, setAudioDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (index: number, setDragging: React.Dispatch<React.SetStateAction<number | null>>) => {
    setDragging(index);
  };

  const handleDragOver = (
    index: number,
    items: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    setDragging: React.Dispatch<React.SetStateAction<number | null>>,
    draggingIndex: number | null
  ) => {
    if (draggingIndex === null || draggingIndex === index) return;
    const newItems = Array.from(items);
    const [draggedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDragging(index);
    setItems(newItems);
  };

  const handleDragEnd = (setDragging: React.Dispatch<React.SetStateAction<number | null>>) => {
    setDragging(null);
  };

  const renderSections = (
    items: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    draggingIndex: number | null,
    setDragging: React.Dispatch<React.SetStateAction<number | null>>
  ) =>
    items.map((section, index) => (
      <DraggableSection
        key={section}
        draggable
        isDragging={draggingIndex === index}
        onDragStart={() => handleDragStart(index, setDragging)}
        onDragOver={(e) => {
          e.preventDefault();
          handleDragOver(index, items, setItems, setDragging, draggingIndex);
        }}
        onDragEnd={() => handleDragEnd(setDragging)}
      >
        <label>{section}</label>
      </DraggableSection>
    ));

  return (
    <SettingContainer>
      {/* 화면 설정 섹션 */}
      <ScreenSetContainer>
        {renderSections(screenSections, setScreenSections, screenDraggingIndex, setScreenDraggingIndex)}
      </ScreenSetContainer>

      {/* 오디오 설정 섹션 */}
      <AudioSetContainer>
        {renderSections(audioSections, setAudioSections, audioDraggingIndex, setAudioDraggingIndex)}
      </AudioSetContainer>

      {/* 볼륨 믹서 */}
      <VolumeMixerContainer>
        <VolumeMixer />
      </VolumeMixerContainer>
    </SettingContainer>
  );
};

/* Styled Components */
const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  border-radius: 14px;
  background-color: #1f1f1f;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  gap: 10px;
  padding: 16px;
`;

const ScreenSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background-color: #2c2c2c;
`;

const AudioSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background-color: #2c2c2c;
`;

const DraggableSection = styled.div<{ isDragging?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background-color: ${(props) => (props.isDragging ? "#252525" : "#3a3a3a")};
  cursor: grab;
  border-radius: 6px;
  margin-bottom: 6px;
  box-shadow: ${(props) => (props.isDragging ? "0 8px 16px rgba(0,0,0,0.3)" : "none")};
  transition: background-color 0.2s, box-shadow 0.2s, transform 0.1s;

  & > label {
    font-size: 15px;
    color: #fff;
    font-weight: 500;
  }

  &:hover {
    background-color: ${(props) => (props.isDragging ? "#252525" : "#4a4a4a")};
  }
`;

const VolumeMixerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.5;
  padding: 16px;
  border-radius: 12px;
  background-color: #2c2c2c;
  overflow-y: auto;
`;