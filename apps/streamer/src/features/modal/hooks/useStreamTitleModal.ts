import { useState } from 'react';

export const useStreamTitleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

  const openModal = (title?: string) => {
    setCurrentTitle(title || '');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentTitle('');
  };

  return {
    isOpen,
    currentTitle,
    openModal,
    closeModal
  };
};
