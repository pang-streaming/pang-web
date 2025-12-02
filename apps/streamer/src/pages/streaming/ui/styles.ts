import styled, { keyframes } from "styled-components";

// Animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
`;

// Layout Components
export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 16px;
  padding: 14px;
  overflow: hidden;
  min-height: 0;
`;

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

export const StreamSettingSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
`;

export const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
  max-height: calc(100vh - 200px);
  overflow: hidden;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
`;

export const LoadingText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

// Header Components
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  padding-right: 10px;
`;

export const CategorySection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 8px;
  max-width: 200px;
`;

export const CategoryImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
`;

export const CategoryName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const CategoryPlaceholder = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

export const StreamTitle = styled.h3<{ $clickable?: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: color 0.2s;

  ${({ $clickable, theme }) =>
    $clickable &&
    `
    &:hover {
      color: ${theme.colors.primary.normal};
    }
  `}
`;

// Status Components
export const StreamBottomSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  padding-top: 0;
  padding-bottom: 5px;
`;

export const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

export const StatusIndicator = styled.div<{ $isLive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

export const StatusDot = styled.div<{ $isLive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isLive, theme }) => ($isLive ? theme.colors.status.success : theme.colors.text.subtitle)};
  animation: ${({ $isLive }) => ($isLive ? "pulse 2s infinite" : "none")};

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const StatusText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const StreamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StreamType = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-weight: 500;
`;

export const StreamKeyDisplay = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-family: monospace;
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: 4px 8px;
  border-radius: 4px;
  word-break: break-all;
`;

export const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

export const StreamKeyButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.borders.small};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.text.subtitle};
    cursor: not-allowed;
  }
`;

// Modal Components (재사용 가능)
export const ModalOverlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.colors.background.dark}CC`};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s
    ease-out;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div<{ $isClosing?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.3s
    ease-out;
  transform-origin: center;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
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

export const ModalBody = styled.div`
  padding: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.text.subtitle};
    cursor: not-allowed;
  }
`;

// StreamingSettingsModal Specific Components
export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary.normal : theme.colors.border.normal};
  border-radius: 12px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? "rgba(59, 130, 246, 0.05)" : theme.colors.background.normal};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"};
  }
`;

export const OptionIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
`;

export const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const OptionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const OptionDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StreamingInfoLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
  min-width: 80px;
`;

export const StreamingInfoValue = styled.div`
  flex: 1;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-family: monospace;
  background-color: ${({ theme }) => theme.colors.background.normal};
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  word-break: break-all;
`;

export const CopyButton = styled.button`
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const InfoText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 1.5;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

export const RtmpUrlList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
`;

export const RtmpUrlItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.content.dark};
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

export const RtmpUrlText = styled.span`
  flex: 1;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-family: monospace;
  word-break: break-all;
  margin-right: 12px;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.subtitle};
  cursor: pointer;
  font-size: 24px;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.content.normal};
    color: ${({ theme }) => theme.colors.status.negative};
  }
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};
  border: 2px dashed ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    border-color: ${({ theme }) => theme.colors.primary.normal};
    color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

export const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.9rem;
  font-style: italic;
`;
