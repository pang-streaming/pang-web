import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.normal};
  padding: 60px; // 위/아래 여백 충분히
  border-radius: ${({ theme }) => theme.borders.xlarge};
  width: 600px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: stretch; 
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.3s ease-out;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.normal};
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.borders.medium};
  outline: none;
  color: ${({ theme }) => theme.colors.text.normal};
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.background.light};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    background-color: ${({ theme }) => theme.colors.background.normal};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.normal}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};
  }
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.borders.medium};
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  outline: none;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.medium};
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  min-height: 180px;
  background-color: ${({ theme }) => theme.colors.background.light};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    background-color: ${({ theme }) => theme.colors.background.normal};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.normal}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.light};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.normal};
    border-radius: 4px;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const ErrorText = styled.p`
  color: #ff4757;
  font-size: ${({ theme }) => theme.font.small};
  margin: 0;
  padding: 10px 14px;
  background-color: #ff475710;
  border-radius: ${({ theme }) => theme.borders.medium};
  border-left: 3px solid #ff4757;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borders.large};
  border: 2px dashed ${({ theme }) => theme.colors.border.normal};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    background-color: ${({ theme }) => theme.colors.background.normal};
  }
`;
export const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.borders.medium};
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary.normal}40;
  }

  &:active {
    transform: none;
  }
`;

export const ImagePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
`;
export const ImagePreviewItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borders.medium};
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;
export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  opacity: 0;

  ${ImagePreviewItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #ff4757;
    transform: scale(1.15) rotate(90deg);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`;

export const ImageCount = styled.p`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.small};
  text-align: center;
  font-weight: 500;
`;
