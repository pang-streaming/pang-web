import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDevices } from '../../hooks/useDevices';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSource: (name: string, type: string, deviceId?: string) => Promise<void>;
  onAddImageSource: (name: string, file: File) => void;
  onAddTextSource: (name: string, text: string, fontSize: number, color: string) => void;
  existingSources?: Array<{ type: string; deviceId?: string }>;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({
  isOpen,
  onClose,
  onAddSource,
  onAddImageSource,
  onAddTextSource,
  existingSources = []
}) => {
  const [sourceName, setSourceName] = useState('');
  const [sourceType, setSourceType] = useState('video');
  const [selectedDevice, setSelectedDevice] = useState('');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState('#ffffff');
  
  const { getVideoDevices, getAudioInputDevices, isLoading } = useDevices();
  
  const videoDevices = getVideoDevices();
  const audioInputDevices = getAudioInputDevices();
  
  const hasDisplaySource = existingSources.some(source => 
    source.deviceId === 'desktop-video' || source.deviceId === 'browser-video'
  );

  const handleAddSource = async () => {
    if (sourceName.trim() && selectedDevice) {
      await onAddSource(sourceName.trim(), sourceType, selectedDevice);
      setSourceName('');
      setSelectedDevice('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!sourceName.trim()) {
        setSourceName(file.name);
      }
    }
  };

  const handleAddImage = () => {
    if (sourceName.trim() && selectedFile) {
      onAddImageSource(sourceName.trim(), selectedFile);
      setSourceName('');
      setSelectedFile(null);
    }
  };

  const handleAddText = () => {
    if (sourceName.trim() && textContent.trim()) {
      onAddTextSource(sourceName.trim(), textContent.trim(), fontSize, textColor);
      setSourceName('');
      setTextContent('');
      setFontSize(24);
      setTextColor('#ffffff');
    }
  };

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
              {sourceType === 'video' && videoDevices.map(device => {
                const isDisplaySource = device.id === 'desktop-video' || device.id === 'browser-video';
                const isDisabled = isDisplaySource && hasDisplaySource;
                return (
                  <option 
                    key={device.id} 
                    value={device.id}
                    disabled={isDisabled}
                  >
                    {device.label}{isDisabled ? ' (이미 추가됨)' : ''}
                  </option>
                );
              })}
              {sourceType === 'audio' && audioInputDevices.map(device => (
                <option key={device.id} value={device.id}>
                  {device.label}
                </option>
              ))}
            </DeviceSelect>
          </DeviceSection>
        )}

        {sourceType === 'image' && (
          <ImageSection>
            <Label>이미지 파일</Label>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <FilePreview>
                <FileInfo>선택된 파일: {selectedFile.name}</FileInfo>
                <FileSize>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</FileSize>
              </FilePreview>
            )}
          </ImageSection>
        )}

        {sourceType === 'text' && (
          <TextSection>
            <Label>텍스트 내용</Label>
            <TextArea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="텍스트를 입력하세요"
              rows={3}
            />
            <TextOptions>
              <TextOption>
                <Label>글자 크기</Label>
                <NumberInput
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  min="12"
                  max="72"
                />
              </TextOption>
              <TextOption>
                <Label>글자 색상</Label>
                <ColorInput
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </TextOption>
            </TextOptions>
          </TextSection>
        )}

        <AddSourceButton
          onClick={
            sourceType === 'image' ? handleAddImage :
            sourceType === 'text' ? handleAddText :
            handleAddSource
          }
          disabled={
            sourceType === 'image' ? (!sourceName.trim() || !selectedFile) :
            sourceType === 'text' ? (!sourceName.trim() || !textContent.trim()) :
            (!sourceName.trim() || !selectedDevice)
          }
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
  background-color: ${({ theme }) => theme.colors.background.dark};
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
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.background.dark};
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

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FileInput = styled.input`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  box-sizing: border-box;
  
  &::file-selector-button {
    background-color: ${({ theme }) => theme.colors.primary.normal};
    color: ${({ theme }) => theme.colors.common.white};
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-right: 12px;
    cursor: pointer;
    font-size: 14px;
  }
`;

const FilePreview = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
`;

const FileInfo = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.common.white};
  margin-bottom: 4px;
`;

const FileSize = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const TextOptions = styled.div`
  display: flex;
  gap: 16px;
`;

const TextOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 8px 12px;
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

const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

export default SourcesModal;
