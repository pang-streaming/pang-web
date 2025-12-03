import { useState } from 'react';

export type SourceType = 'screen' | 'image' | 'vtuber' | '3d-background' | null;

export const useAddSourceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<SourceType>(null);

  const openModal = () => {
    setIsOpen(true);
    setSelectedType(null); // 모달 열 때 선택 초기화
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedType(null);
  };

  const selectType = (type: SourceType) => {
    setSelectedType(type);
  };

  const goBack = () => {
    setSelectedType(null); // 뒤로가기: 타입 선택 화면으로
  };

  return {
    isOpen,
    selectedType,
    openModal,
    closeModal,
    selectType,
    goBack,
  };
};
