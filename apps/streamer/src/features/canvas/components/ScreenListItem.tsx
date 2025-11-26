import React from 'react';
import styled from 'styled-components';
import { Screen } from '@/features/canvas/constants/canvas-constants';

interface ScreenListItemProps {
  screen: Screen;
  index: number;
  isDragging: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onRemove: () => void;
}

export const ScreenListItem = ({
  screen,
  index,
  isDragging,
  onDragStart,
  onDragOver,
  onDragEnd,
  onRemove,
}: ScreenListItemProps) => {
  const getScreenIcon = (type: Screen['type']): string => {
    switch (type) {
      case 'video':
        return '🖥️';
      case 'image':
        return '🖼️';
      case 'canvas':
        return '👤'; // VTuber
      default:
        return '📄';
    }
  };

  const getScreenName = (screen: Screen): string => {
    if (screen.name) return screen.name;
    if (screen.id === 999) return 'VTuber';
    if (screen.type === 'video') return `화면 공유 ${index + 1}`;
    if (screen.type === 'image') return `이미지 ${index + 1}`;
    return `소스 ${index + 1}`;
  };

  return (
    <ScreenItem
      draggable
      isDragging={isDragging}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <ScreenInfo>
        <ScreenIcon>{getScreenIcon(screen.type)}</ScreenIcon>
        <ScreenName>{getScreenName(screen)}</ScreenName>
      </ScreenInfo>
      <RemoveButton onClick={onRemove} title="제거">
        ✕
      </RemoveButton>
    </ScreenItem>
  );
};

const ScreenItem = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? theme.colors.hover.normal : theme.colors.content.dark};
  border-radius: ${({ theme }) => theme.borders.large};
  margin-bottom: 6px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? '0 8px 16px rgba(0,0,0,0.3)' : 'none'};
  transition: all 0.2s;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const ScreenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const ScreenIcon = styled.span`
  font-size: 1.2rem;
`;

const ScreenName = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.subtitle};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.content.normal};
    color: ${({ theme }) => theme.colors.text.normal};
  }
`;
