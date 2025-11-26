import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Screen, CanvasSize } from '@/features/canvas/constants/canvas-constants';

interface ImageOptionProps {
  canvasSize: CanvasSize;
  onAddScreen: (screen: Screen) => void;
  onClose: () => void;
  sourceName?: string;
}

export const ImageOption = ({
  canvasSize,
  onAddScreen,
  onClose,
  sourceName,
}: ImageOptionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택 가능합니다.');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleConfirm = () => {
    if (!selectedFile || !previewUrl) {
      alert('이미지를 선택해주세요.');
      return;
    }

    const img = new Image();
    img.onload = () => {
      const imageAspectRatio = img.width / img.height;
      const width = Math.min(400, canvasSize.width * 0.3);
      const height = width / imageAspectRatio;
      const x = (canvasSize.width - width) / 2;
      const y = (canvasSize.height - height) / 2;

      const screenObj: Screen = {
        id: Date.now(),
        type: 'image',
        source: img,
        x: x,
        y: y,
        width: width,
        height: height,
        name: sourceName || '이미지',
      };

      onAddScreen(screenObj);
      onClose();
      URL.revokeObjectURL(previewUrl);
    };

    img.src = previewUrl;
  };

  return (
    <OptionContainer>
      <Description>
        캔버스에 추가할 이미지를 선택하세요.
      </Description>
      
      <FileInputWrapper>
        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <SelectFileButton onClick={() => fileInputRef.current?.click()}>
          📁 파일 선택
        </SelectFileButton>
        {selectedFile && <FileName>{selectedFile.name}</FileName>}
      </FileInputWrapper>

      {previewUrl && (
        <PreviewContainer>
          <PreviewLabel>미리보기:</PreviewLabel>
          <PreviewImage src={previewUrl} alt="Preview" />
        </PreviewContainer>
      )}

      <ButtonGroup>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <ConfirmButton onClick={handleConfirm} disabled={!selectedFile}>
          확인
        </ConfirmButton>
      </ButtonGroup>
    </OptionContainer>
  );
};

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.95rem;
  margin: 0;
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SelectFileButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};
  border: 2px dashed ${({ theme }) => theme.colors.border.normal};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    border-color: ${({ theme }) => theme.colors.text.normal};
  }
`;

const FileName = styled.div`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 0.9rem;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 6px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PreviewLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 0.95rem;
  font-weight: 600;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.content.dark};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary || '#4CAF50'};
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
