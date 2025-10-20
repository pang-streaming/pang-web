import React, { useState, useCallback } from 'react';
import { Screen, CanvasSize } from '@/features/canvas/constants/canvas-constants';
import ThreeCanvas from '../ui/ThreeCanvas';

export const useVrmScreen = (canvasSize: CanvasSize, vrmUrl: string | null, isCameraEnabled: boolean, selectedDevice: MediaDeviceInfo | null) => {
  const [screen, setScreen] = useState<Screen | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const onCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    const vrmScreen: Screen = {
      id: 999,
      type: 'canvas',
      source: canvas,
      x: 0,
      y: 0,
      width: 600,
      height: 600,
    };
    setScreen(vrmScreen);
  }, []);

  const VrmRenderer = useCallback(() => (
    <ThreeCanvas
	    selectedDevice={selectedDevice}
      vrmUrl={vrmUrl}
      isCameraEnabled={isCameraEnabled && isVisible}
      onCanvasReady={onCanvasReady}
      isVisible={isVisible}
      width={600}
      height={600}
    />
  ), [selectedDevice, vrmUrl, isCameraEnabled, isVisible, onCanvasReady]);

  const toggleVrmVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return { screen, VrmRenderer, toggleVrmVisibility };
};