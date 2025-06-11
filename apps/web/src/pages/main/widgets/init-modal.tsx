import React from "react";
import styled from "styled-components";

interface InitModallProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const InitModal = ({ isOpen, onClose, children }: InitModallProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px 32px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  position: relative;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background: #ff5555;
  border: none;
  padding: 8px 16px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #ff0000;
  }
`;