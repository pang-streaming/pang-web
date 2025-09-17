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
  sources: string[]; 
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


  const requestDisplayMedia = useCallback(async (sourceId: string) => {
    try {

      const existingDisplaySource = sources.find(source => 
        source.deviceId === 'desktop-video' || source.deviceId === 'browser-video'
      );
      
      let stream: MediaStream;
      
      if (existingDisplaySource?.stream) {
        stream = existingDisplaySource.stream.clone();
      } else {

        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false
        });
      }
      

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


  const updatePreview = useCallback(async () => {
    if (!currentScene) return;
    
    const activeScene = scenes.find(scene => scene.id === currentScene);
    if (!activeScene) return;

    try {

      const visibleVideoSources = sources.filter(source => 
        source.type === 'video' && 
        source.visible && 
        activeScene.sources.includes(source.id)
      );

      if (visibleVideoSources.length > 0) {
        const firstSource = visibleVideoSources[0];
        

        if (firstSource.stream) {
          setPreviewStream(firstSource.stream);
          return;
        }
        
        let stream: MediaStream;
        

        if (firstSource.deviceId === 'desktop-video' || firstSource.deviceId === 'browser-video') {

          setPreviewStream(null);
          return;
        } else {

          stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: firstSource.deviceId }
          });
        }
        

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


  useEffect(() => {
    updatePreview();
  }, [currentScene, scenes, sources, updatePreview]);


  const addScene = useCallback(async (name: string, selectedDevices?: string[]) => {
    const newScene: StreamScene = {
      id: `scene_${Date.now()}`,
      name,
      active: false,
      sources: []
    };
    

    if (selectedDevices && selectedDevices.length > 0) {
      const videoDevices = getVideoDevices();
      const audioDevices = getAudioInputDevices();
      
      const newSources: StreamSource[] = await Promise.all(selectedDevices.map(async (deviceId) => {

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
        

        if (isVideoDevice || isDesktopVideo || isBrowserVideo) {
          try {
            if (isDesktopVideo || isBrowserVideo) {
            } else {
              stream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: deviceId }
              });
            }
          } catch (error) {
            console.error('비디오 캡처 오류:', error);
          }
        }

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
      

      setSources(prev => [...prev, ...newSources]);
      

      newScene.sources = newSources.map(source => source.id);
    }
    
    setScenes(prev => [...prev, newScene]);
    return newScene.id;
  }, [getVideoDevices, getAudioInputDevices]);


  const switchScene = useCallback((sceneId: string) => {
    setScenes(prev => prev.map(scene => ({
      ...scene,
      active: scene.id === sceneId
    })));
    setCurrentScene(sceneId);
  }, []);


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
    

    if (currentScene) {
      addSourceToScene(currentScene, newSource.id);
    }
    
    return newSource.id;
  }, [currentScene, addSourceToScene]);


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
    

    if (currentScene) {
      addSourceToScene(currentScene, newSource.id);
    }
    
    return newSource.id;
  }, [currentScene, addSourceToScene]);


  const addSource = useCallback(async (name: string, type: 'video' | 'audio' | 'image' | 'text', deviceId?: string) => {
    let stream: MediaStream | undefined;
    

    if (type === 'video' && deviceId) {
      try {
        if (deviceId === 'desktop-video' || deviceId === 'browser-video') {
        } else {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId }
          });
        }
      } catch (error) {
        console.error('비디오 캡처 오류:', error);
      }
    }

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
    
    if (currentScene) {
      addSourceToScene(currentScene, newSource.id);
    }
    
    return newSource.id;
  }, [currentScene, addSourceToScene]);


  const toggleSourceVisibility = useCallback((sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, visible: !source.visible }
        : source
    ));
  }, []);


  const setAudioLevel = useCallback((sourceId: string, level: number) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, audioLevel: level }
        : source
    ));
  }, []);


  const toggleAudioMute = useCallback((sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, audioMuted: !source.audioMuted }
        : source
    ));
  }, []);


  const updateSourceOrder = useCallback((sceneId: string, newSourceOrder: string[]) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId 
        ? { ...scene, sources: newSourceOrder }
        : scene
    ));
  }, []);


  const deleteSource = useCallback((sourceId: string) => {
    setSources(prev => prev.filter(source => source.id !== sourceId));
    setScenes(prev => prev.map(scene => ({
      ...scene,
      sources: scene.sources.filter(id => id !== sourceId)
    })));
  }, []);


  const startStreaming = useCallback(() => {
    setIsStreaming(true);

  }, []);

  const stopStreaming = useCallback(() => {
    setIsStreaming(false);

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
    updateSourceOrder,
    deleteSource,
    addSourceToScene,
    removeSourceFromScene,
    updatePreview,
    requestDisplayMedia,
    startStreaming,
    stopStreaming
  };
};
