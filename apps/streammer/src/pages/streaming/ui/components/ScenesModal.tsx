import React, { useState } from 'react';
import styled from 'styled-components';
import { useDevices } from '../../hooks/useDevices';
import type { StreamScene } from '../../hooks/useStreaming';

interface ScenesModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenes: StreamScene[];
  onAddScene: (name: string, selectedDevices?: string[]) => void;
  onSelectScene: (sceneId: string) => void;
}

export const ScenesModal: React.FC<ScenesModalProps> = ({
  isOpen,
  onClose,
  scenes,
  onAddScene,
  onSelectScene
}) => {
  const [sceneName, setSceneName] = useState('');
  const [activeTab, setActiveTab] = useState<'screen' | 'audio'>('screen');
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());
  
  const { getVideoDevices, getAudioInputDevices, isLoading } = useDevices();
  const videoDevices = getVideoDevices();
  const audioDevices = getAudioInputDevices();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sceneName.trim()) {
      onAddScene(sceneName.trim());
      setSceneName('');
    }
  };

  const handleDeviceToggle = (deviceId: string) => {
    setSelectedDevices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(deviceId)) {
        newSet.delete(deviceId);
      } else {
        newSet.add(deviceId);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Scenes</ModalTitle>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        
        <ModalContent>
          <InputSection>
            <Label>장면 이름</Label>
            <form onSubmit={handleSubmit}>
              <SceneNameInput
                type="text"
                value={sceneName}
                onChange={(e) => setSceneName(e.target.value)}
                placeholder="장면 이름을 입력하세요"
              />
            </form>
          </InputSection>
          
          <TabSection>
            <TabButton 
              $active={activeTab === 'screen'} 
              onClick={() => setActiveTab('screen')}
            >
              화면
            </TabButton>
            <TabButton 
              $active={activeTab === 'audio'} 
              onClick={() => setActiveTab('audio')}
            >
              오디오
            </TabButton>
          </TabSection>
          
          <ContentSection>
            {activeTab === 'screen' ? (
              <ScreenTabContent>
                <SectionTitle>화면 소스</SectionTitle>
                {isLoading ? (
                  <LoadingText>디바이스를 불러오는 중...</LoadingText>
                ) : videoDevices.length > 0 ? (
                  <DeviceList>
                    {videoDevices.map((device) => (
                      <DeviceItem key={device.id}>
                        <DeviceCheckbox 
                          type="checkbox" 
                          checked={selectedDevices.has(device.id)}
                          onChange={() => handleDeviceToggle(device.id)}
                        />
                        <DeviceIcon $type="video" />
                        <DeviceName>{device.label}</DeviceName>
                      </DeviceItem>
                    ))}
                  </DeviceList>
                ) : (
                  <EmptyText>사용 가능한 비디오 디바이스가 없습니다.</EmptyText>
                )}
                
                <AddSceneButton onClick={() => {
                  const selectedDevicesArray = Array.from(selectedDevices);
                  if (sceneName.trim()) {
                    onAddScene(sceneName.trim(), selectedDevicesArray);
                    setSceneName('');
                  } else {
                    onAddScene(`새 ${activeTab === 'screen' ? '화면' : '오디오'} 장면`, selectedDevicesArray);
                  }
                }}>
                  + 장면 추가
                </AddSceneButton>
              </ScreenTabContent>
            ) : (
              <AudioTabContent>
                <SectionTitle>오디오 소스</SectionTitle>
                {isLoading ? (
                  <LoadingText>디바이스를 불러오는 중...</LoadingText>
                ) : audioDevices.length > 0 ? (
                  <DeviceList>
                    {audioDevices.map((device) => (
                      <DeviceItem key={device.id}>
                        <DeviceCheckbox 
                          type="checkbox" 
                          checked={selectedDevices.has(device.id)}
                          onChange={() => handleDeviceToggle(device.id)}
                        />
                        <DeviceIcon $type="audio" />
                        <DeviceName>{device.label}</DeviceName>
                      </DeviceItem>
                    ))}
                  </DeviceList>
                ) : (
                  <EmptyText>사용 가능한 오디오 디바이스가 없습니다.</EmptyText>
                )}
                
                <AddSceneButton onClick={() => {
                  const selectedDevicesArray = Array.from(selectedDevices);
                  if (sceneName.trim()) {
                    onAddScene(sceneName.trim(), selectedDevicesArray);
                    setSceneName('');
                  } else {
                    onAddScene(`새 ${activeTab === 'screen' ? '화면' : '오디오'} 장면`, selectedDevicesArray);
                  }
                }}>
                  + 장면 추가
                </AddSceneButton>
              </AudioTabContent>
            )}
          </ContentSection>
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

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.common.white};
`;

const SceneNameInput = styled.input`
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

const TabSection = styled.div`
  display: flex;
  gap: 0;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 4px;
  overflow: hidden;
`;

interface TabButtonProps {
  $active: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 12px 16px;
  background-color: ${props => props.$active ? ({ theme }) => theme.colors.content.light : ({ theme }) => theme.colors.content.normal};
  border: none;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.content.light};
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ScreenTabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AudioTabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
  margin: 0;
`;

const LoadingText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  padding: 20px 0;
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  padding: 20px 0;
`;

const DeviceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const DeviceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const DeviceCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary.normal};
`;

interface DeviceIconProps {
  $type: 'video' | 'audio';
}

const DeviceIcon = styled.div<DeviceIconProps>`
  width: 16px;
  height: 16px;
  background-image: ${({ $type, theme }) => {
    const iconColor = encodeURIComponent(theme.colors.common.white);
    if ($type === 'video') {
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${iconColor}' viewBox='0 0 16 16'%3E%3Cpath d='M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43'/%3E%3Cpath d='M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1'/%3E%3C/svg%3E")`;
    } else {
      return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${iconColor}' viewBox='0 0 16 16'%3E%3Cpath d='M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z'/%3E%3Cpath d='M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5'/%3E%3C/svg%3E")`;
    }
  }};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const DeviceName = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.common.white};
`;

const AddSceneButton = styled.button`
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
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export default ScenesModal;
