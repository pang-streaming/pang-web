import styled from "styled-components";
import { useState } from "react";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import { useVideoCard } from "@/entities/video/hooks/controller/useVideoCard";
import normalThumbnail from '@/app/assets/video-thumbnail.png'
import { IStreamDataResponse } from "../../model/type";
import { useMyFollower } from "@/features/follow/hooks/useFollow";

interface HeaderVideoProps {
  videos: IStreamDataResponse[];
  hideProfile?: boolean;
}

export const HeaderVideo = ({ videos, hideProfile }: HeaderVideoProps) => {
  const [activeVideo, setActiveVideo] = useState<number>(0);

  if (!videos || videos.length === 0) {
    return null;
  }

  const currentVideo = videos[activeVideo];
  if (!currentVideo) {
    return null;
  }

  const { title, nickname, username, streamId, profileImage, url, thumbnail, followers, viewCount } = currentVideo;
  const { handleOnClickVideoCard, handleOnClickProfile } = useVideoCard({
    streamId,
    username,
  });

  const { data: followerData } = useMyFollower(username);
  const followerCount = followerData?.data?.length ?? followers ?? 0;
  console.log("headerthumbmail: ",thumbnail)
  return (
    <HeaderVideoContainer
      onClick={handleOnClickVideoCard}
      backgroundImage={thumbnail || normalThumbnail}
    >
      <LiveCardContainer>
        <LiveContainer>
          <LiveTag>LIVE</LiveTag>
          <LiveTitleContainer>
            <LiveTitle>{viewCount}명 시청 중</LiveTitle>
          </LiveTitleContainer>
        </LiveContainer>
        <StreamingTitle>{title}</StreamingTitle>
      </LiveCardContainer>
      {!hideProfile && (
        <LiveInfoContainer>
          <ProfileImage
            src={profileImage || normalProfile}
            onClick={handleOnClickProfile}
          />
          <TitleContainer>
            <StreamerName>{nickname}</StreamerName>
            <StreamerFollower>{followerCount.toLocaleString()}명</StreamerFollower>
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
                src={video.profileImage || normalProfile}
              />
            ))}
          </StreamersContainer>
        </LiveInfoContainer>
      )}
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
  z-index: 5;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borders.large};
`;

const LiveTitleContainer = styled.div`
  padding: 5px 14px;
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: white;
  z-index: 5;
`;
const LiveTitle = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  z-index: 5;
  color: ${({ theme }) => theme.colors.secondary.normal};
`;

const HeaderVideoContainer = styled.div<{ backgroundImage?: string }>`
  padding: 20px;
  height: 340px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  margin-bottom: 35px;
  background-color: ${({ theme }) => theme.colors.text.subtitle};
  background-image: ${(props) =>
    props.backgroundImage ? `url(${props.backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
    pointer-events: none;
    border-radius: 20px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const StreamingTitle = styled.span`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
  z-index: 5;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borders.maximum};
  margin-right: 8px;
  margin-bottom: 7px;
  z-index: 5;
  &:hover {
    opacity: 0.8;
  }
`;

const StreamerName = styled.span`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  z-index: 5;
  color: ${({ theme }) => theme.colors.common.white};
`;

const StreamerFollower = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.placeholder};
  z-index: 5;
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
