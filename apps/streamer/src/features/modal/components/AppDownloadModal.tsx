import styled from "styled-components";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ButtonGroup,
  CancelButton,
  SaveButton,
} from "@/pages/streaming/ui/styles";

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const AppDownloadModal = ({
  isOpen,
  onClose,
  onDownload,
}: AppDownloadModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>팡 스트리머 앱 필요</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <ContentWrapper>
            <IconWrapper>
              <AppIcon>📡</AppIcon>
            </IconWrapper>
            <Description>
              스트리밍을 시작하려면 팡 스트리머 앱이 필요합니다.
              <br />
              앱이 설치되어 있지 않다면 다운로드해주세요.
            </Description>
            <ButtonGroup>
              <CancelButton onClick={onClose}>취소</CancelButton>
              <SaveButton onClick={onDownload}>다운로드</SaveButton>
            </ButtonGroup>
          </ContentWrapper>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background.light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppIcon = styled.span`
  font-size: 40px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  line-height: 1.6;
  margin: 0;
`;
