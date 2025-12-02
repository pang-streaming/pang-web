import { useState } from "react";
import styled, { keyframes } from "styled-components";

interface PlayerInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerInstallModal = ({ isOpen, onClose }: PlayerInstallModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleInstall = () => {
    window.location.href = "pangplayer://init";
  };

  const handleDownload = () => {
    // 다운로드 페이지로 이동
    window.open("https://cdn-hls.euns.dev/PangPlayer-Installer.pkg", "_blank");
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose} $isClosing={isClosing}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <ModalHeader>
          <ModalTitle>플레이어 설치 필요</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <IconWrapper>
            <PlayerIcon>🎬</PlayerIcon>
          </IconWrapper>

          <Description>
            방송을 시청하려면 <Strong>팡 플레이어</Strong>를 설치해주세요.
            <br />
            플레이어를 설치하면 더 나은 시청 경험을 즐길 수 있습니다.
          </Description>

          <ButtonGroup>
            <InstallButton onClick={handleDownload}>
              플레이어 설치하기
            </InstallButton>
            <RetryButton onClick={handleInstall}>
              이미 설치했어요
            </RetryButton>
          </ButtonGroup>

          <HelpText>
            설치 후 '이미 설치했어요'를 클릭하세요.
          </HelpText>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
`;

// Styled Components
const ModalOverlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div<{ $isClosing?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2),
    0 10px 10px -5px rgba(0, 0, 0, 0.1);
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.3s ease-out;
  transform-origin: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 0 24px;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerIcon = styled.span`
  font-size: 40px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.normal};
  text-align: center;
  line-height: 1.6;
  margin: 0;
`;

const Strong = styled.strong`
  color: ${({ theme }) => theme.colors.primary.normal};
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const InstallButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const RetryButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const HelpText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  margin: 0;
`;
