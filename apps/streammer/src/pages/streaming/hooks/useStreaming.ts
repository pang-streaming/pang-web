import { useState, useRef, useCallback, useEffect } from 'react';
import { useDevices } from './useDevices';

export interface StreamSource {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image' | 'text';
  deviceId?: string;
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

  // 화면 공유 요청 함수
  const requestDisplayMedia = useCallback(async (sourceId: string) => {
    try {
      // 기존 화면 공유 스트림이 있는지 확인
      const existingDisplaySource = sources.find(source => 
        source.deviceId === 'desktop-video' || source.deviceId === 'browser-video'
      );
      
      let stream: MediaStream;
      
      if (existingDisplaySource?.stream) {
        // 기존 스트림이 있으면 복사해서 사용
        stream = existingDisplaySource.stream.clone();
      } else {
        // 새로운 화면 공유 요청
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false
        });
      }
      
      // 소스에 스트림 저장
      setSources(prev => prev.map(source => 
        source.id === sourceId 
          ? { ...source, stream }
          : source
      ));
      
      return stream;
    } catch (error) {
      console.error('화면 공유 오류:', error);
      throw error;
    }
  }, [sources]);

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
        const firstSource = visibleVideoSources[0];
        
        // 이미 스트림이 있는 경우 사용
        if (firstSource.stream) {
          setPreviewStream(firstSource.stream);
          return;
        }
        
        let stream: MediaStream;
        
        // 데스크탑 또는 브라우저 화면 캡처는 사용자 상호작용이 필요하므로 스킵
        if (firstSource.deviceId === 'desktop-video' || firstSource.deviceId === 'browser-video') {
          // 화면 공유는 사용자가 직접 요청해야 함
          setPreviewStream(null);
          return;
        } else {
          // 일반 카메라 디바이스
          stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: firstSource.deviceId }
          });
        }
        
        // 소스에 스트림 저장
        setSources(prev => prev.map(source => 
          source.id === firstSource.id 
            ? { ...source, stream }
            : source
        ));
        
        setPreviewStream(stream);
      } else {
        setPreviewStream(null);
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
  const addScene = useCallback(async (name: string, selectedDevices?: string[]) => {
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
      
      const newSources: StreamSource[] = await Promise.all(selectedDevices.map(async (deviceId) => {
        // 디바이스 타입에 따라 소스 타입 결정
        const isVideoDevice = videoDevices.some(device => device.id === deviceId);
        const isDesktopVideo = deviceId === 'desktop-video';
        const isBrowserVideo = deviceId === 'browser-video';
        const isDesktopAudio = deviceId === 'desktop-audio';
        const isBrowserAudio = deviceId === 'browser-audio';
        
        let sourceType: 'video' | 'audio';
        let deviceName: string;
        let stream: MediaStream | undefined;
        
        if (isVideoDevice || isDesktopVideo || isBrowserVideo) {
          sourceType = 'video';
          if (isDesktopVideo) {
            deviceName = '데스크탑 화면';
          } else if (isBrowserVideo) {
            deviceName = '크롬 브라우저 화면';
          } else {
            deviceName = videoDevices.find(device => device.id === deviceId)?.label || '비디오 디바이스';
          }
        } else {
          sourceType = 'audio';
          if (isDesktopAudio) {
            deviceName = '데스크탑 오디오';
          } else if (isBrowserAudio) {
            deviceName = '크롬 브라우저 오디오';
          } else {
            deviceName = audioDevices.find(device => device.id === deviceId)?.label || '오디오 디바이스';
          }
        }
        
        // 비디오 소스 스트림 캡처
        if (isVideoDevice || isDesktopVideo || isBrowserVideo) {
          try {
            if (isDesktopVideo || isBrowserVideo) {
              // 데스크탑/브라우저 화면은 사용자 상호작용이 필요하므로 스킵
              // 나중에 사용자가 직접 요청할 수 있도록 소스만 생성
            } else {
              stream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: deviceId }
              });
            }
          } catch (error) {
            console.error('비디오 캡처 오류:', error);
          }
        }
        // 데스크탑 또는 브라우저 오디오 캡처
        else if (isDesktopAudio || isBrowserAudio) {
          try {
            stream = await navigator.mediaDevices.getDisplayMedia({
              video: false,
              audio: true
            });
          } catch (error) {
            console.error('오디오 캡처 오류:', error);
          }
        }
        
        return {
          id: `source_${Date.now()}_${Math.random()}`,
          name: deviceName,
          type: sourceType,
          deviceId,
          visible: true,
          stream
        };
      }));
      
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

  // 이미지 소스 추가
  const addImageSource = useCallback((name: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    
    const newSource: StreamSource = {
      id: `source_${Date.now()}`,
      name,
      type: 'image',
      visible: true,
      imageUrl
    };
    setSources(prev => [...prev, newSource]);
    
    // 현재 활성 씬이 있으면 소스를 씬에 추가
    if (currentScene) {
      addSourceToScene(currentScene, newSource.id);
    }
    
    return newSource.id;
  }, [currentScene, addSourceToScene]);

  // 텍스트 소스 추가
  const addTextSource = useCallback((name: string, text: string, fontSize: number = 24, color: string = '#ffffff') => {
    const newSource: StreamSource = {
      id: `source_${Date.now()}`,
      name,
      type: 'text',
      visible: true,
      textContent: text,
      textStyle: { fontSize, color }
    };
    setSources(prev => [...prev, newSource]);
    
    // 현재 활성 씬이 있으면 소스를 씬에 추가
    if (currentScene) {
      addSourceToScene(currentScene, newSource.id);
    }
    
    return newSource.id;
  }, [currentScene, addSourceToScene]);

  // 소스 추가
  const addSource = useCallback(async (name: string, type: 'video' | 'audio' | 'image' | 'text', deviceId?: string) => {
    let stream: MediaStream | undefined;
    
    // 비디오 소스 스트림 캡처
    if (type === 'video' && deviceId) {
      try {
        if (deviceId === 'desktop-video' || deviceId === 'browser-video') {
          // 데스크탑/브라우저 화면은 사용자 상호작용이 필요하므로 스킵
          // 나중에 사용자가 직접 요청할 수 있도록 소스만 생성
        } else {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId }
          });
        }
      } catch (error) {
        console.error('비디오 캡처 오류:', error);
      }
    }
    // 데스크탑 또는 브라우저 오디오 캡처
    else if (deviceId === 'desktop-audio' || deviceId === 'browser-audio') {
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: false,
          audio: true
        });
      } catch (error) {
        console.error('오디오 캡처 오류:', error);
      }
    }
    
    const newSource: StreamSource = {
      id: `source_${Date.now()}`,
      name,
      type,
      deviceId,
      visible: true,
      stream
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

  // 오디오 레벨 조절
  const setAudioLevel = useCallback((sourceId: string, level: number) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, audioLevel: level }
        : source
    ));
  }, []);

  // 오디오 음소거 토글
  const toggleAudioMute = useCallback((sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, audioMuted: !source.audioMuted }
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
    addImageSource,
    addTextSource,
    toggleSourceVisibility,
    setAudioLevel,
    toggleAudioMute,
    deleteSource,
    addSourceToScene,
    removeSourceFromScene,
    updatePreview,
    requestDisplayMedia,
    startStreaming,
    stopStreaming
  };
};
