import React from 'react';
import styled from 'styled-components';

interface StreamPreviewProps {
  onTagClick: () => void;
  previewStream?: MediaStream | null;
}

export const StreamPreview: React.FC<StreamPreviewProps> = ({ onTagClick, previewStream }) => {
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

export default StreamPreview;
