import React, { useState, useCallback } from 'react';
import { Screen, CanvasSize } from '@/features/canvas/constants/canvas-constants';
import ThreeCanvas from '../ui/ThreeCanvas';

export const useVrmScreen = (canvasSize: CanvasSize, vrmUrl: string | null, isCameraEnabled: boolean, selectedDevice: MediaDeviceInfo | null) => {
  const [screen, setScreen] = useState<Screen | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const onCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    const vrmScreen: Screen = {
      id: 999, // Special ID for the VRM screen
      type: 'canvas',
      source: canvas,
      x: 0,
      y: 0,
      width: canvasSize.width,
      height: canvasSize.height,
    };
    setScreen(vrmScreen);
  }, [canvasSize]);

  const VrmRenderer = useCallback(() => (
    <ThreeCanvas
	    selectedDevice={selectedDevice}
      vrmUrl={vrmUrl}
      isCameraEnabled={isCameraEnabled && isVisible}
      onCanvasReady={onCanvasReady}
      isVisible={isVisible}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  ), [selectedDevice, vrmUrl, isCameraEnabled, isVisible, onCanvasReady, canvasSize.width, canvasSize.height]);

  const toggleVrmVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return { screen, VrmRenderer, toggleVrmVisibility };
};