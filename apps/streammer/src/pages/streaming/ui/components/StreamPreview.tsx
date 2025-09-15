import React, { useState } from 'react';
import styled from 'styled-components';

interface Source {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  stream?: MediaStream;
  imageUrl?: string;
  textContent?: string;
  textStyle?: {
    fontSize: number;
    color: string;
  };
  audioLevel?: number;
  audioMuted?: boolean;
}

interface StreamPreviewProps {
  onTagClick: () => void;
  previewStream?: MediaStream | null;
  sources?: Source[];
  activeScene?: { id: string; sources: string[] };
  onSourceClick?: (sourceId: string) => void;
  onRequestDisplayMedia?: (sourceId: string) => Promise<void>;
}

export const StreamPreview: React.FC<StreamPreviewProps> = ({ 
  onTagClick, 
  previewStream, 
  sources = [], 
  activeScene,
  onSourceClick,
  onRequestDisplayMedia
}) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [sourcePositions, setSourcePositions] = useState<Record<string, { x: number; y: number; width: number; height: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // 씬이 바뀔 때마다 소스 위치 초기화
  React.useEffect(() => {
    setSourcePositions({});
    setSelectedSource(null);
  }, [activeScene?.id]);

  const handleSourceClick = (sourceId: string) => {
    setSelectedSource(selectedSource === sourceId ? null : sourceId);
    onSourceClick?.(sourceId);
  };

  const handleMouseDown = (e: React.MouseEvent, sourceId: string, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    
    const sourcePos = sourcePositions[sourceId] || { x: 50, y: 50, width: 200, height: 150 };
    
    if (action === 'drag') {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - sourcePos.x,
        y: e.clientY - sourcePos.y
      });
    } else if (action === 'resize') {
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: sourcePos.width,
        height: sourcePos.height
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectedSource) return;
    
    const sourcePos = sourcePositions[selectedSource] || { x: 50, y: 50, width: 200, height: 150 };
    
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      setSourcePositions(prev => ({
        ...prev,
        [selectedSource]: {
          ...sourcePos,
          x: Math.max(0, Math.min(newX, 800 - sourcePos.width)),
          y: Math.max(0, Math.min(newY, 600 - sourcePos.height))
        }
      }));
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(50, resizeStart.width + deltaX);
      const newHeight = Math.max(50, resizeStart.height + deltaY);
      
      setSourcePositions(prev => ({
        ...prev,
        [selectedSource]: {
          ...sourcePos,
          width: newWidth,
          height: newHeight
        }
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // 마우스 이벤트 리스너 등록
  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, selectedSource, dragStart, resizeStart, sourcePositions]);


  return (
    <PreviewContainer>
      <VideoPreview>
        {previewStream ? (
          <VideoElement
            ref={(video) => {
              if (video && previewStream) {
                video.srcObject = previewStream;
                video.play();
              }
            }}
            autoPlay
            muted
          />
        ) : (
          <VideoPlaceholder>
            <PlaceholderText>실제 방송중인 화면</PlaceholderText>
          </VideoPlaceholder>
        )}
        
        {/* 소스 오버레이 - 활성 씬의 비디오, 이미지, 텍스트 소스만 표시 (previewStream이 없을 때만) */}
        {!previewStream && sources.filter(source => 
          source.visible && 
          source.type !== 'audio' && 
          activeScene?.sources.includes(source.id)
        ).map(source => {
          const position = sourcePositions[source.id] || { x: 50, y: 50, width: 200, height: 150 };
          return (
            <SourceOverlay
              key={source.id}
              $selected={selectedSource === source.id}
              $position={position}
              onClick={() => handleSourceClick(source.id)}
              onMouseDown={(e) => handleMouseDown(e, source.id, 'drag')}
            >
              {source.stream ? (
                <SourceVideo
                  ref={(video) => {
                    if (video && source.stream) {
                      video.srcObject = source.stream;
                      video.play();
                    }
                  }}
                  autoPlay
                  muted
                />
              ) : source.type === 'image' && source.imageUrl ? (
                <SourceImage src={source.imageUrl} alt={source.name} />
              ) : source.type === 'text' && source.textContent ? (
                <SourceText 
                  style={{
                    fontSize: source.textStyle?.fontSize || 24,
                    color: source.textStyle?.color || '#ffffff'
                  }}
                >
                  {source.textContent}
                </SourceText>
              ) : (
                <SourcePlaceholder>
                  <SourceLabel>{source.name}</SourceLabel>
                  {(source.type === 'video' && (source.name.includes('데스크탑') || source.name.includes('브라우저'))) && (
                    <ShareButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestDisplayMedia?.(source.id);
                      }}
                    >
                      화면 공유 시작
                    </ShareButton>
                  )}
                </SourcePlaceholder>
              )}
              {selectedSource === source.id && (
                <ResizeControls>
                  <ResizeHandle
                    $position="nw"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, source.id, 'resize');
                    }}
                  />
                  <ResizeHandle
                    $position="ne"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, source.id, 'resize');
                    }}
                  />
                  <ResizeHandle
                    $position="sw"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, source.id, 'resize');
                    }}
                  />
                  <ResizeHandle
                    $position="se"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, source.id, 'resize');
                    }}
                  />
                </ResizeControls>
              )}
            </SourceOverlay>
          );
        })}
      </VideoPreview>
      <BottomControlsRow>
        <TagInputContainer>
          <TagInput placeholder="태그 입력" />
        </TagInputContainer>
        <TagButtonsContainer>
          <TagButton onClick={onTagClick} $active>버추얼</TagButton>
          <TagButton onClick={onTagClick}>소통</TagButton>
          <TagButton onClick={onTagClick}>게임</TagButton>
        </TagButtonsContainer>
      </BottomControlsRow>
    </PreviewContainer>
  );
};

const PreviewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const VideoPreview = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 비율 */
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const BottomControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TagInputContainer = styled.div`
  flex: 1;
`;

const TagInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const TagButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

interface TagButtonProps {
  $active?: boolean;
}

const TagButton = styled.button<TagButtonProps>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  background-color: ${props => props.$active ? ({ theme }) => theme.colors.primary.normal : 'transparent'};
  color: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${props => props.$active ? ({ theme }) => theme.colors.primary.normal : ({ theme }) => theme.colors.stroke.normal};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.$active ? ({ theme }) => theme.colors.primary.normal : ({ theme }) => theme.colors.stroke.dark};
    background-color: ${props => props.$active ? ({ theme }) => theme.colors.primary.normal : 'rgba(255, 255, 255, 0.05)'};
  }
`;

// 소스 오버레이 관련 스타일
interface SourceOverlayProps {
  $selected: boolean;
  $position: { x: number; y: number; width: number; height: number };
}

const SourceOverlay = styled.div<SourceOverlayProps>`
  position: absolute;
  left: ${props => props.$position.x}px;
  top: ${props => props.$position.y}px;
  width: ${props => props.$position.width}px;
  height: ${props => props.$position.height}px;
  background-color: transparent;
  border: 2px solid ${props => props.$selected ? ({ theme }) => theme.colors.common.white : 'transparent'};
  border-radius: 4px;
  cursor: ${props => props.$selected ? 'move' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: all 0.2s ease;
  user-select: none;
  overflow: hidden;
  
  &:hover {
    border-color: ${props => props.$selected ? ({ theme }) => theme.colors.common.white : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const SourceVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const SourceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
`;

const SourceText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
  padding: 8px;
  border-radius: 4px;
`;

const SourcePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 16px;
`;

const SourceLabel = styled.div`
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  margin-bottom: 8px;
`;

const ShareButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const ResizeControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

interface ResizeHandleProps {
  $position: 'nw' | 'ne' | 'sw' | 'se';
}

const ResizeHandle = styled.div<ResizeHandleProps>`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.primary.normal};
  border-radius: 50%;
  pointer-events: all;
  cursor: ${props => {
    switch (props.$position) {
      case 'nw': return 'nw-resize';
      case 'ne': return 'ne-resize';
      case 'sw': return 'sw-resize';
      case 'se': return 'se-resize';
      default: return 'default';
    }
  }};
  
  ${props => {
    switch (props.$position) {
      case 'nw': return 'top: -4px; left: -4px;';
      case 'ne': return 'top: -4px; right: -4px;';
      case 'sw': return 'bottom: -4px; left: -4px;';
      case 'se': return 'bottom: -4px; right: -4px;';
      default: return '';
    }
  }}
`;

export default StreamPreview;
