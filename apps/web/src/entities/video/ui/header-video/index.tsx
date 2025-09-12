import { Video } from "@/entities/video/model/type";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderVideoProps {
  videos: Video[];
}

export const HeaderVideo = ({ videos }: HeaderVideoProps) => {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const { title, nickname, profileImage } = videos[activeVideo];

  const navigate = useNavigate();
  const handleOnClickVideoCard = () => {
    const streamId = videos[activeVideo].streamId;
    navigate(`/livedetail?streamId=${streamId}`);
  };

  return (
    <HeaderVideoContainer onClick={handleOnClickVideoCard}>
      <LiveCardContainer>
        <LiveContainer>
          <LiveTag>LIVE</LiveTag>
          <LiveTitle>201명 시청 중</LiveTitle>
        </LiveContainer>
        <StreamingTitle>{title}</StreamingTitle>
      </LiveCardContainer>
      <LiveInfoContainer>
        <ProfileImage src={profileImage} />
        <TitleContainer>
          <StreamerName>{nickname}</StreamerName>
          <StreamerFollower>12.1만명</StreamerFollower>
        </TitleContainer>
        <StreamersContainer>
          {videos.map((video, index) => (
            <Streamer
              key={index}
              isActive={index === activeVideo}
              onClick={(e) => {
                e.stopPropagation(); 
                setActiveVideo(index);
              }}
              src={video.profileImage}
            />
          ))}
        </StreamersContainer>
      </LiveInfoContainer>
    </HeaderVideoContainer>
  );
};

const LiveCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LiveContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
  align-items: center;
  gap: 10px;
`;

const LiveTag = styled.div`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
  background-color: ${({ theme }) => theme.colors.secondary.normal};
  padding: 5px 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borders.large};
`;

const LiveTitle = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary.normal};
`;

const HeaderVideoContainer = styled.div`
  padding: 20px;
  height: 340px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  margin-bottom: 35px;
  background-color: ${({ theme }) => theme.colors.text.subtitle};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
	
	&:hover {
		cursor: pointer;
	}
`;

const StreamingTitle = styled.span`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borders.maximum};
  margin-right: 8px;
  margin-bottom: 7px;
`;

const StreamerName = styled.span`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
`;

const StreamerFollower = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.placeholder};
`;

const LiveInfoContainer = styled.div`
  display: flex;
`;

const TitleContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const StreamersContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  gap: 18px;
`;

const Streamer = styled.img<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borders.xlarge};
  cursor: pointer;
  box-sizing: border-box;
  border: ${({ theme, isActive }) =>
    isActive ? `2px solid ${theme.colors.primary.normal}` : "none"};
  -webkit-user-drag: none;
`;
