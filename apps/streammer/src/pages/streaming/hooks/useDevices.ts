import { useState, useEffect } from 'react';

export interface Device {
  id: string;
  label: string;
  kind: MediaDeviceKind | 'desktop' | 'browser' | 'desktop-video' | 'browser-video';
}

export interface AudioLevel {
  deviceId: string;
  level: number;
  muted: boolean;
}

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDevices = async () => {
      try {
        // 미디어 디바이스 접근 권한 요청
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        // 모든 디바이스 목록 가져오기
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        
        const deviceData: Device[] = deviceList
          .filter(device => device.kind === 'videoinput' || device.kind === 'audioinput' || device.kind === 'audiooutput')
          .map(device => ({
            id: device.deviceId,
            label: device.label || `${device.kind} ${device.deviceId.slice(0, 8)}`,
            kind: device.kind
          }));

        // 데스크탑과 브라우저 소스 추가 (실제 디바이스로 인식)
        const additionalSources: Device[] = [
          {
            id: 'desktop-video',
            label: '데스크탑 화면',
            kind: 'desktop-video'
          },
          {
            id: 'browser-video',
            label: '크롬 브라우저 화면',
            kind: 'browser-video'
          },
          {
            id: 'desktop-audio',
            label: '데스크탑 오디오',
            kind: 'desktop'
          },
          {
            id: 'browser-audio',
            label: '크롬 브라우저 오디오',
            kind: 'browser'
          }
        ];

        setDevices([...deviceData, ...additionalSources]);
        setIsLoading(false);
      } catch (error) {
        console.error('디바이스 접근 오류:', error);
        setIsLoading(false);
      }
    };

    getDevices();

    // 디바이스 변경 감지
    const handleDeviceChange = () => {
      getDevices();
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, []);

  const getVideoDevices = () => devices.filter(device => 
    device.kind === 'videoinput' || device.kind === 'desktop-video' || device.kind === 'browser-video'
  );
  const getAudioInputDevices = () => devices.filter(device => 
    device.kind === 'audioinput' || device.kind === 'desktop' || device.kind === 'browser'
  );
  const getAudioOutputDevices = () => devices.filter(device => device.kind === 'audiooutput');

  return {
    devices,
    isLoading,
    getVideoDevices,
    getAudioInputDevices,
    getAudioOutputDevices
  };
};
