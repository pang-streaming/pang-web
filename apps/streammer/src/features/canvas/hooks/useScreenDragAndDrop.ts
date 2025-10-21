import { useCallback, useState } from 'react';
import { Screen } from '@/features/canvas/constants/canvas-constants';

interface ScreenDragState {
  draggingIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragOver: (index: number) => void;
  handleDragEnd: () => void;
}

export const useScreenDragAndDrop = (
  screens: Screen[],
  setScreens: React.Dispatch<React.SetStateAction<Screen[]>>
): ScreenDragState => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    setDraggingIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (index: number) => {
      if (draggingIndex === null || draggingIndex === index) return;

      setScreens((prevScreens) => {
        const newScreens = Array.from(prevScreens);
        const [draggedScreen] = newScreens.splice(draggingIndex, 1);
        newScreens.splice(index, 0, draggedScreen);
        return newScreens;
      });
      setDraggingIndex(index);
    },
    [draggingIndex, setScreens]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  return {
    draggingIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
