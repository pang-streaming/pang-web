import { useState, useRef, useCallback, useEffect } from 'react';
import { useDevices } from './useDevices';

export interface StreamSource {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image' | 'text';
  deviceId?: string;
  visible: boolean;
  stream?: MediaStream;
}

export interface StreamScene {
  id: string;
  name: string;
  active: boolean;
  sources: string[]; // source IDs
}

export const useStreaming = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentScene, setCurrentScene] = useState<string>('');
  const [scenes, setScenes] = useState<StreamScene[]>([]);
  const [sources, setSources] = useState<StreamSource[]>([]);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { getVideoDevices, getAudioInputDevices } = useDevices();

  // 비디오 미리보기 업데이트
  const updatePreview = useCallback(async () => {
    if (!currentScene) return;
    
    const activeScene = scenes.find(scene => scene.id === currentScene);
    if (!activeScene) return;

    try {
      // 활성 장면의 가시적인 비디오 소스들만 가져오기
      const visibleVideoSources = sources.filter(source => 
        source.type === 'video' && 
        source.visible && 
        activeScene.sources.includes(source.id)
      );

      if (visibleVideoSources.length > 0) {
        // 첫 번째 비디오 소스의 스트림 가져오기
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: visibleVideoSources[0].deviceId }
        });
        setPreviewStream(stream);
      }
    } catch (error) {
      console.error('미리보기 업데이트 오류:', error);
    }
  }, [currentScene, scenes, sources]);

  // currentScene이나 sources가 변경될 때마다 미리보기 업데이트
  useEffect(() => {
    updatePreview();
  }, [currentScene, scenes, sources, updatePreview]);

  // 장면 추가 (선택된 디바이스들로 소스 생성)
  const addScene = useCallback((name: string, selectedDevices?: string[]) => {
    const newScene: StreamScene = {
      id: `scene_${Date.now()}`,
      name,
      active: false,
      sources: []
    };
    
    // 선택된 디바이스들로 소스 생성
    if (selectedDevices && selectedDevices.length > 0) {
      const videoDevices = getVideoDevices();
      const audioDevices = getAudioInputDevices();
      
      const newSources: StreamSource[] = selectedDevices.map(deviceId => {
        // 디바이스 타입에 따라 소스 타입 결정
        const isVideoDevice = videoDevices.some(device => device.id === deviceId);
        const sourceType = isVideoDevice ? 'video' : 'audio';
        const deviceName = isVideoDevice 
          ? videoDevices.find(device => device.id === deviceId)?.label || '비디오 디바이스'
          : audioDevices.find(device => device.id === deviceId)?.label || '오디오 디바이스';
        
        return {
          id: `source_${Date.now()}_${Math.random()}`,
          name: deviceName,
          type: sourceType as 'video' | 'audio',
          deviceId,
          visible: true
        };
      });
      
      // 소스들을 먼저 추가
      setSources(prev => [...prev, ...newSources]);
      
      // 씬에 소스 ID들 연결
      newScene.sources = newSources.map(source => source.id);
    }
    
    setScenes(prev => [...prev, newScene]);
    return newScene.id;
  }, [getVideoDevices, getAudioInputDevices]);

  // 장면 전환
  const switchScene = useCallback((sceneId: string) => {
    setScenes(prev => prev.map(scene => ({
      ...scene,
      active: scene.id === sceneId
    })));
    setCurrentScene(sceneId);
  }, []);

  // 장면에 소스 추가/제거
  const addSourceToScene = useCallback((sceneId: string, sourceId: string) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId
        ? { ...scene, sources: [...scene.sources, sourceId] }
        : scene
    ));
  }, []);

  const removeSourceFromScene = useCallback((sceneId: string, sourceId: string) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId
        ? { ...scene, sources: scene.sources.filter(id => id !== sourceId) }
        : scene
    ));
  }, []);

  // 소스 추가
  const addSource = useCallback((name: string, type: 'video' | 'audio' | 'image' | 'text', deviceId?: string) => {
    const newSource: StreamSource = {
      id: `source_${Date.now()}`,
      name,
      type,
      deviceId,
      visible: true
    };
    setSources(prev => [...prev, newSource]);
    
    // 현재 활성 씬이 있으면 소스를 씬에 추가
    if (currentScene) {
      addSourceToScene(currentScene, newSource.id);
    }
    
    return newSource.id;
  }, [currentScene, addSourceToScene]);

  // 소스 가시성 토글
  const toggleSourceVisibility = useCallback((sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, visible: !source.visible }
        : source
    ));
  }, []);

  // 소스 삭제
  const deleteSource = useCallback((sourceId: string) => {
    setSources(prev => prev.filter(source => source.id !== sourceId));
    setScenes(prev => prev.map(scene => ({
      ...scene,
      sources: scene.sources.filter(id => id !== sourceId)
    })));
  }, []);

  // 스트리밍 시작/중지
  const startStreaming = useCallback(() => {
    setIsStreaming(true);
    // 실제 스트리밍 로직 구현
  }, []);

  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
    // 스트림 정리
    if (previewStream) {
      previewStream.getTracks().forEach(track => track.stop());
    }
  }, [previewStream]);

  return {
    isStreaming,
    currentScene,
    scenes,
    sources,
    previewStream,
    canvasRef,
    videoRef,
    addScene,
    switchScene,
    addSource,
    toggleSourceVisibility,
    deleteSource,
    addSourceToScene,
    removeSourceFromScene,
    updatePreview,
    startStreaming,
    stopStreaming
  };
};
