import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDevices } from '../../hooks/useDevices';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSource: (name: string, type: string, deviceId?: string) => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({
  isOpen,
  onClose,
  onAddSource
}) => {
  const [sourceName, setSourceName] = useState('');
  const [sourceType, setSourceType] = useState('video');
  const [selectedDevice, setSelectedDevice] = useState('');
  
  const { getVideoDevices, getAudioInputDevices, isLoading } = useDevices();
  
  const videoDevices = getVideoDevices();
  const audioInputDevices = getAudioInputDevices();

  const handleAddSource = () => {
    if (sourceName.trim() && selectedDevice) {
      onAddSource(sourceName.trim(), sourceType, selectedDevice);
      setSourceName('');
      setSelectedDevice('');
    }
  };

  // 소스 타입 변경 시 디바이스 목록 업데이트
  useEffect(() => {
    if (sourceType === 'video' && videoDevices.length > 0) {
      setSelectedDevice(videoDevices[0].id);
    } else if (sourceType === 'audio' && audioInputDevices.length > 0) {
      setSelectedDevice(audioInputDevices[0].id);
    } else {
      setSelectedDevice('');
    }
  }, [sourceType, videoDevices, audioInputDevices]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Sources</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        
        <ModalContent>
          <InputSection>
            <Label>소스 이름</Label>
            <SourceNameInput
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="소스 이름을 입력하세요"
            />
          </InputSection>
          
          <TypeSection>
            <Label>소스 타입</Label>
            <TypeSelect
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value)}
            >
              <option value="video">비디오</option>
              <option value="audio">오디오</option>
              <option value="image">이미지</option>
              <option value="text">텍스트</option>
            </TypeSelect>
          </TypeSection>
          
          {(sourceType === 'video' || sourceType === 'audio') && (
            <DeviceSection>
              <Label>디바이스 선택</Label>
              <DeviceSelect
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                disabled={isLoading}
              >
                <option value="">디바이스를 선택하세요</option>
                {sourceType === 'video' && videoDevices.map(device => (
                  <option key={device.id} value={device.id}>
                    {device.label}
                  </option>
                ))}
                {sourceType === 'audio' && audioInputDevices.map(device => (
                  <option key={device.id} value={device.id}>
                    {device.label}
                  </option>
                ))}
              </DeviceSelect>
            </DeviceSection>
          )}
          
          <AddSourceButton 
            onClick={handleAddSource}
            disabled={!sourceName.trim() || !selectedDevice}
          >
            + 소스 추가
          </AddSourceButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 8px;
  width: 600px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseIcon = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TypeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DeviceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.common.white};
`;

const SourceNameInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  box-sizing: border-box;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const TypeSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const DeviceSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AddSourceButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-sizing: border-box;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.stroke.normal};
    color: ${({ theme }) => theme.colors.text.subtitle};
    cursor: not-allowed;
  }
`;


export default SourcesModal;
