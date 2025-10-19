import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.normal};
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.font.large};
  font-weight: bold;
  color: ${({theme}) => theme.colors.text.normal};
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  outline: none;
  color: ${({theme}) => theme.colors.text.normal};
  border: 1px solid #ccc;
  font-size: ${({ theme }) => theme.font.medium};
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  color: ${({theme}) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.medium};
  resize: vertical;
  min-height: 120px;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

export const FileInput = styled.input`
  width: 100%;
  color: ${({theme}) => theme.colors.text.normal};

`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const ImagePreviewItem = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    transform: scale(1.1);
  }
`;

export const ImageCount = styled.p`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
`;
