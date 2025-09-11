import React from 'react';
import styled from 'styled-components';

interface VideoUploadProps {
  onUploadClick: () => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadClick }: VideoUploadProps) => {
  return (
    <UploadContainer>
      <SectionTitle>동영상 업로드</SectionTitle>
      <UploadBox>
        <UploadIconWrapper>
          <UploadIcon />
        </UploadIconWrapper>
        <UploadText>내 동영상을 간편하게 업로드 하세요</UploadText>
        <UploadButton onClick={onUploadClick}>업로드 하기</UploadButton>
      </UploadBox>
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 24px;
  height: 100%;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0 0 16px 0;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 1px dashed ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 24px;
`;

const UploadIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background.normal};
  margin-bottom: 16px;
`;

const UploadIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.border.normal};
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.border.normal};
  }
`;

const UploadText = styled.p`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0 0 24px 0;
  text-align: center;
`;

const UploadButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
