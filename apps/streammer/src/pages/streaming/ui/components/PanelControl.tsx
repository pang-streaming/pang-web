import React, { useState } from 'react';
import styled from 'styled-components';
import ScenesModal from './ScenesModal';
import SourcesModal from './SourcesModal';
import { useAudioLevels } from '../../hooks/useAudioLevels';
import type { StreamScene } from '../../hooks/useStreaming';

interface Source {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  deviceId?: string;
  audioLevel?: number;
  audioMuted?: boolean;
}

interface PanelControlProps {
  scenes: StreamScene[];
  sources?: Source[];
  onSceneChange: (sceneId: string) => void;
  onSourceToggle?: (sourceId: string) => void;
  onVolumeChange?: (sourceId: string, level: number) => void;
  onMuteToggle?: (sourceId: string) => void;
  onAddScene?: (name: string, selectedDevices?: string[]) => Promise<void>;
  onAddSource?: (name: string, type: string, deviceId?: string) => Promise<void>;
  onAddImageSource?: (name: string, file: File) => void;
  onAddTextSource?: (name: string, text: string, fontSize: number, color: string) => void;
}

export const PanelControl: React.FC<PanelControlProps> = ({
  scenes,
  sources = [],
  onSceneChange,
  onSourceToggle,
  onVolumeChange,
  onMuteToggle,
  onAddScene,
  onAddSource,
  onAddImageSource,
  onAddTextSource
}) => {
  const [isScenesModalOpen, setIsScenesModalOpen] = useState(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  
  const activeScene = scenes.find(scene => scene.active);
  const activeSceneSources = activeScene 
    ? sources.filter(source => activeScene.sources.includes(source.id))
    : [];
  
  const audioLevels = useAudioLevels(activeSceneSources);
  return (
    <ControlPanelsContainer>
      <PanelsRow>
        <ScenesPanel>
          <PanelHeader>
            <PanelTitle>Scenes</PanelTitle>
            <AddButton 
              title="씬 추가" 
              onClick={() => setIsScenesModalOpen(true)}
            >
              +
            </AddButton>
          </PanelHeader>
          <PanelContent>
            <SceneList>
              {scenes.map(scene => (
                <SceneItem 
                  key={scene.id} 
                  $active={scene.active}
                  onClick={() => onSceneChange(scene.id)}
                >
                  {scene.name}
                </SceneItem>
              ))}
            </SceneList>
          </PanelContent>
        </ScenesPanel>
        
        <SourcesPanel>
          <PanelHeader>
            <PanelTitle>Sources</PanelTitle>
            <AddButton 
              title="소스 추가" 
              onClick={() => setIsSourcesModalOpen(true)}
            >
              +
            </AddButton>
          </PanelHeader>
          <PanelContent>
            <SourceList>
              {activeSceneSources.map(source => (
                <SourceItem key={source.id}>
                  <SourceIcon $type={source.type} />
                  <SourceName>{source.name}</SourceName>
                  <VisibilityButton 
                    $visible={source.visible}
                    onClick={() => onSourceToggle && onSourceToggle(source.id)}
                  />
                </SourceItem>
              ))}
            </SourceList>
          </PanelContent>
        </SourcesPanel>
        
        <AudioPanel>
          <PanelHeader>
            <PanelTitle>볼륨 믹서</PanelTitle>
          </PanelHeader>
          <PanelContent>
            <AudioList>
              {activeSceneSources
                .filter(source => source.type === 'audio')
                .map(source => {
                  const audioLevel = audioLevels.find(level => level.deviceId === source.id);
                  const currentLevel = source.audioLevel ?? (audioLevel ? audioLevel.level : -20);
                  const isMuted = source.audioMuted ?? (audioLevel?.muted || false);
                  
                  return (
                    <AudioItem key={source.id}>
                      <AudioName>{source.name}</AudioName>
                      <VolumeControl>
                        <VolumeSlider
                          type="range"
                          min="-60"
                          max="0"
                          value={currentLevel}
                          onChange={(e) => onVolumeChange && onVolumeChange(source.id, parseInt(e.target.value))}
                        />
                      </VolumeControl>
                      <MuteButton 
                        $muted={isMuted}
                        onClick={() => onMuteToggle && onMuteToggle(source.id)}
                      />
                    </AudioItem>
                  );
                })}
              {activeSceneSources.filter(source => source.type === 'audio').length === 0 && (
                <EmptyAudioText>오디오 소스가 없습니다</EmptyAudioText>
              )}
            </AudioList>
          </PanelContent>
        </AudioPanel>
      </PanelsRow>
      
            <ScenesModal
              isOpen={isScenesModalOpen}
              onClose={() => setIsScenesModalOpen(false)}
              scenes={scenes}
              onAddScene={async (name, selectedDevices) => {
                await onAddScene?.(name, selectedDevices);
                setIsScenesModalOpen(false);
              }}
              onSelectScene={onSceneChange}
            />

            <SourcesModal
              isOpen={isSourcesModalOpen}
              onClose={() => setIsSourcesModalOpen(false)}
              onAddSource={async (name, type, deviceId) => {
                await onAddSource?.(name, type, deviceId);
                setIsSourcesModalOpen(false);
              }}
              onAddImageSource={(name, file) => {
                onAddImageSource?.(name, file);
                setIsSourcesModalOpen(false);
              }}
              onAddTextSource={(name, text, fontSize, color) => {
                onAddTextSource?.(name, text, fontSize, color);
                setIsSourcesModalOpen(false);
              }}
              existingSources={sources.map(source => ({
                type: source.type,
                deviceId: source.deviceId
              }))}
            />
    </ControlPanelsContainer>
  );
};

const ControlPanelsContainer = styled.div`
  width: 100%;
`;

const PanelsRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const Panel = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 180px;
`;

const ScenesPanel = styled(Panel)``;  
const SourcesPanel = styled(Panel)``;
const AudioPanel = styled(Panel)``;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const PanelTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
`;

const PanelContent = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
`;

const SceneList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface SceneItemProps {
  $active: boolean;
}

const SceneItem = styled.div<SceneItemProps>`
  padding: 6px 10px;
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary.normal : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.common.white : theme.colors.text.subtitle};
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ $active, theme }) => $active ? theme.colors.primary.normal : theme.colors.content.normal};
  }
`;

const AddButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.subtitle};
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.common.white};
    border-color: ${({ theme }) => theme.colors.common.white};
  }
`;

const SourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SourceItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.content.normal};
  }
`;

interface SourceIconProps {
  $type: string;
}

const SourceIcon = styled.div<SourceIconProps>`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  background-image: ${({ $type, theme }) => {
    const iconColor = encodeURIComponent(theme.colors.common.white);
    switch ($type) {
      case 'video': 
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${iconColor}' viewBox='0 0 16 16'%3E%3Cpath d='M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43'/%3E%3Cpath d='M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1'/%3E%3C/svg%3E")`;
      case 'audio': 
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${iconColor}' viewBox='0 0 16 16'%3E%3Cpath d='M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z'/%3E%3Cpath d='M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5'/%3E%3C/svg%3E")`;
      case 'image': 
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${iconColor}' viewBox='0 0 16 16'%3E%3Cpath d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0'/%3E%3Cpath d='M1.5 1A1.5 1.5 0 0 0 0 2.5v11A1.5 1.5 0 0 0 1.5 15h13a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 14.5 1zM1 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5zM11.5 11h.175a.25.25 0 0 1 .075.484l-4.5 1.5a.25.25 0 0 1-.3-.1L4.5 10h-.17A2.495 2.495 0 0 0 2 7.5h2.485a2.5 2.5 0 0 0 4.03 0h2.485a.5.5 0 0 1 .5.5z'/%3E%3C/svg%3E")`;
      default: 
        return 'none';
    }
  }};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const SourceName = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
`;

interface VisibilityButtonProps {
  $visible: boolean;
}

const VisibilityButton = styled.button<VisibilityButtonProps>`
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-image: ${({ $visible, theme }) => 
    $visible 
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z'/%3E%3Cpath d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755l.707.707z'/%3E%3Cpath d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829'/%3E%3Cpath d='M3.35 5.47q-.27.24-.518.457a13 13 0 0 0-1.66 2.043 13 13 0 0 0 2.93 3.56q.495.436 1.02.79l.707-.707q-.375-.248-.735-.539-.508-.406-.944-.863A10.8 10.8 0 0 1 2.717 8q.087-.13.195-.288c.335-.48.83-1.12 1.465-1.755L3.35 5.47z'/%3E%3Cpath d='M1.115 3.529a.5.5 0 1 0 .708-.708L.323.321a.5.5 0 0 0-.708.708l1.5 1.5zm12.292 12a.5.5 0 1 0 .708-.708l-1.5-1.5a.5.5 0 0 0-.708.708l1.5 1.5z'/%3E%3C/svg%3E")`
  };
`;

const AudioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AudioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AudioName = styled.div`
  width: 60px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VolumeControl = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.status.positive}, ${({ theme }) => theme.colors.status.neutral}, ${({ theme }) => theme.colors.status.negative});
  outline: none;
  position: relative;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.common.white};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.common.white};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.stroke.normal};
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.common.white};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.common.white};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.stroke.normal};
  }
  
  &::-webkit-slider-track {
    background: linear-gradient(to right, ${({ theme }) => theme.colors.status.positive}, ${({ theme }) => theme.colors.status.neutral}, ${({ theme }) => theme.colors.status.negative});
  }
  
  &::-moz-range-track {
    background: linear-gradient(to right, ${({ theme }) => theme.colors.status.positive}, ${({ theme }) => theme.colors.status.neutral}, ${({ theme }) => theme.colors.status.negative});
  }
`;

interface MuteButtonProps {
  $muted: boolean;
}

const MuteButton = styled.button<MuteButtonProps>`
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-image: ${({ $muted, theme }) => 
    $muted
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${encodeURIComponent(theme.colors.primary.normal)}' viewBox='0 0 16 16'%3E%3Cpath d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303zm-2.121.708A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-2.61-5.303l-.708.707A5.48 5.48 0 0 1 11.025 8c0 1.519-.618 2.9-1.61 3.901zM9.414 11.01a4.49 4.49 0 0 0 1.61-3.5h-1a3.5 3.5 0 0 1-1.317 2.745zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z'/%3E%3C/svg%3E")`
  };
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const EmptyAudioText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  padding: 20px 0;
`;

export default PanelControl;
