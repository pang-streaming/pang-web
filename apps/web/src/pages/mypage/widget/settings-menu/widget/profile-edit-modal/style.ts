import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.normal};
  padding: 24px;
  border-radius: ${({ theme }) => theme.borders.xlarge};
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borders.medium};
  border: 1px solid #ccc;
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  background-color: ${({ theme }) => theme.colors.background.normal};
  outline: none;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borders.medium};
  border: 1px solid #ccc;
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  background-color: ${({ theme }) => theme.colors.background.normal};
  outline: none;
  box-sizing: border-box;
  appearance: none;
  cursor: pointer;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const ProfileImageLabel = styled.label`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: 500;
`;

export const ProfileImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;

  &:hover {
    border-color: #007bff;
    background-color: rgba(0, 123, 255, 0.05);
  }
`;

export const ProfileImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
`;

export const UploadIcon = styled.div`
  font-size: 24px;
`;

export const UploadText = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  text-align: center;
`;
