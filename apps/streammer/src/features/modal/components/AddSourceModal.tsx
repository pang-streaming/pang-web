import React from 'react';
import styled from 'styled-components';
import { SourceType } from '../hooks/useAddSourceModal';
import { ScreenShareOption } from './ScreenShareOption';
import { ImageOption } from './ImageOption';
import { VTuberOption } from '@/features/modal/components/VtuberOption';
import { Screen, CanvasSize } from '@/features/canvas/constants/canvas-constants';

interface AddSourceModalProps {
  isOpen: boolean;
  selectedType: SourceType;
  onClose: () => void;
  onSelectType: (type: SourceType) => void;
  onGoBack: () => void;
  canvasSize: CanvasSize;
  onAddScreen: (screen: Screen) => void;
  onAddVTuber: (vrmUrl: string | null, selectedDevice: MediaDeviceInfo) => void;
}

export const AddSourceModal = ({
  isOpen,
  selectedType,
  onClose,
  onSelectType,
  onGoBack,
  canvasSize,
  onAddScreen,
  onAddVTuber,
}: AddSourceModalProps) => {
  if (!isOpen) return null;

  if (!selectedType) {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>소스 추가</h2>
            <CloseButton onClick={onClose}>✕</CloseButton>
          </ModalHeader>
          <ModalBody>
            <SourceTypeGrid>
              <SourceTypeCard onClick={() => onSelectType('screen')}>
                <IconWrapper>🖥️</IconWrapper>
                <SourceTypeName>화면 캡쳐</SourceTypeName>
                <SourceTypeDesc>화면 공유하기</SourceTypeDesc>
              </SourceTypeCard>
              
              <SourceTypeCard onClick={() => onSelectType('image')}>
                <IconWrapper>🖼️</IconWrapper>
                <SourceTypeName>이미지</SourceTypeName>
                <SourceTypeDesc>이미지 파일 추가</SourceTypeDesc>
              </SourceTypeCard>
              
              <SourceTypeCard onClick={() => onSelectType('vtuber')}>
                <IconWrapper>👤</IconWrapper>
                <SourceTypeName>VTuber</SourceTypeName>
                <SourceTypeDesc>아바타 추가</SourceTypeDesc>
              </SourceTypeCard>
            </SourceTypeGrid>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <BackButton onClick={onGoBack}>← 뒤로</BackButton>
          <h2>
            {selectedType === 'screen' && '화면 캡쳐'}
            {selectedType === 'image' && '이미지 추가'}
            {selectedType === 'vtuber' && 'VTuber 추가'}
          </h2>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <ModalBody>
          {selectedType === 'screen' && (
            <ScreenShareOption
              canvasSize={canvasSize}
              onAddScreen={onAddScreen}
              onClose={onClose}
            />
          )}
          {selectedType === 'image' && (
            <ImageOption
              canvasSize={canvasSize}
              onAddScreen={onAddScreen}
              onClose={onClose}
            />
          )}
          {selectedType === 'vtuber' && (
            <VTuberOption
              onAddVTuber={onAddVTuber}
              onClose={onClose}
            />
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.normal};
  position: relative;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text.normal};
    flex: 1;
    text-align: center;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  position: absolute;
  left: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  position: absolute;
  right: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const SourceTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
`;

const SourceTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
`;

const SourceTypeName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 4px;
`;

const SourceTypeDesc = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
