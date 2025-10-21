import React from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

interface VideoProps {
  src?: string;
  poster?: string;
  viewers?: number; // 시청자 수
  likes?: number;   // 좋아요 수
}

export const Video: React.FC<VideoProps> = ({ src, poster, viewers = 123, likes = 456 }) => {
  return (
    <LiveContainer>
      <TitleRow>
        <SectionTitle>스트리머님의 방송 ✎</SectionTitle>
        <StatsContainer>
          <StatItem>
            <AiOutlineEye style={{ marginRight: "4px" }} />
            {viewers}
          </StatItem>
          <StatItem>
            <AiOutlineHeart style={{ marginRight: "4px" }} />
            {likes}
          </StatItem>
        </StatsContainer>
      </TitleRow>

      <VideoBox>
        {src ? (
          <VideoElement src={src} poster={poster} controls />
        ) : (
          <UploadText>방송중인 실제 화면</UploadText>
        )}
      </VideoBox>
    </LiveContainer>
  );
};

/* Styled */
const LiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
  padding: 3% 5%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-bottom: -10%;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const VideoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.light};
  border: 1px dashed #ccc;
  border-radius: 16px;
  position: relative;
  aspect-ratio: 16 / 9;
  min-height: 200px;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 150px;
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  background-color: black;
`;

const UploadText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  text-align: center;
`;