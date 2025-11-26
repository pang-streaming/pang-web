import React, { useState } from 'react';
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
  const [sourceName, setSourceName] = useState('');

  if (!isOpen) return null;

  if (!selectedType) {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>화면 소스</h2>
            <CloseButton onClick={onClose}>✕</CloseButton>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <SourceNameInput
              type="text"
              placeholder="소스 이름"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
            />
            
            <TagSection>
              <TagGroup>
                <SourceTag onClick={() => onSelectType('screen')} $isActive={false}>
                  화면 캡처
                </SourceTag>
                <SourceTag onClick={() => onSelectType('image')} $isActive={false}>
                  이미지
                </SourceTag>
                <SourceTag onClick={() => onSelectType('vtuber')} $isActive={false}>
                  VTuber
                </SourceTag>
              </TagGroup>
              <AILink>AI 배경 생성</AILink>
            </TagSection>

            <HelpText>
              화면 공유 시작을 누르면 화면 선택 다이얼로그가 표시됩니다.
            </HelpText>
          </ModalBody>
          <ActionButton onClick={() => {}}>화면 공유 시작</ActionButton>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>화면 소스</h2>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <SourceNameInput
            type="text"
            placeholder="소스 이름"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
          />
          
          <TagSection>
            <TagGroup>
              <SourceTag onClick={() => onSelectType('screen')} $isActive={selectedType === 'screen'}>
                화면 캡처
              </SourceTag>
              <SourceTag onClick={() => onSelectType('image')} $isActive={selectedType === 'image'}>
                이미지
              </SourceTag>
              <SourceTag onClick={() => onSelectType('vtuber')} $isActive={selectedType === 'vtuber'}>
                VTuber
              </SourceTag>
            </TagGroup>
            <AILink>AI 배경 생성</AILink>
          </TagSection>

          <ContentArea>
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
          </ContentArea>
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
  background-color: #000000;
  border-radius: 20px;
  width: 90%;
  max-width: 730px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 23px 24px;
  position: relative;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 900;
    color: #f2f2f2;
    text-align: center;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #f2f2f2;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  position: absolute;
  right: 24px;
  line-height: 1;

  &:hover {
    opacity: 0.7;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #404040;
`;

const ModalBody = styled.div`
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SourceNameInput = styled.input`
  width: 100%;
  padding: 12px 17px;
  background-color: transparent;
  border: 1px solid #262626;
  border-radius: 8px;
  color: #929bad;
  font-size: 15px;
  font-family: 'Wanted Sans', sans-serif;
  outline: none;

  &::placeholder {
    color: #929bad;
  }

  &:focus {
    border-color: #404040;
  }
`;

const TagSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SourceTag = styled.button<{ $isActive: boolean }>`
  padding: 6px 12px;
  background-color: ${({ $isActive }) => ($isActive ? '#404040' : '#262626')};
  border: none;
  border-radius: 999px;
  color: #929bad;
  font-size: 14px;
  font-family: 'Wanted Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #404040;
  }
`;

const AILink = styled.button`
  background: none;
  border: none;
  color: #ff0055;
  font-size: 14px;
  font-family: 'Wanted Sans', sans-serif;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const HelpText = styled.p`
  margin: 0;
  color: #929bad;
  font-size: 14px;
  font-family: 'Wanted Sans', sans-serif;
  line-height: 18px;
`;

const ContentArea = styled.div`
  margin-top: 4px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  background-color: #ff0055;
  border: none;
  border-radius: 0 0 20px 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Wanted Sans', sans-serif;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #e6004d;
  }

  &:active {
    background-color: #cc0044;
  }
`;
