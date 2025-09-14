import nomalProfile from "@/app/assets/images/normal_profile.svg";
import { useFollowInfo } from "../model/useFollowInfo";
import {IoHeart} from "react-icons/io5";
import {IoMdHeartEmpty} from "react-icons/io";
import styled from "styled-components";
import {FollowButton} from "@/shared/ui/button/follow-button";
import {useVideoCard} from "@/entities/video/hooks/useVideoCard";

interface StreamInfoProps {
	streamId: string;
	username: string;
  title?: string;
  nickname?: string;
}

export const StreamInfo = ({ streamId, username, title, nickname }: StreamInfoProps) => {
  const { followerCount, isFollowing, isLoading, toggleFollow } = useFollowInfo(nickname);
	const {handleOnClickProfile} = useVideoCard({streamId, username});
	
  return (
    <StreamInfoContainer>
      <StreamTitle>{title ?? "제목 없는 방송"}</StreamTitle>
      <StreamerInfoContainer>
        <UserContainer>
          <UserProfile src={nomalProfile} onClick={handleOnClickProfile}/>
          <UserInfoWrapper>
            <UserName onClick={handleOnClickProfile}>{nickname || "unknown_user"}</UserName>
            <FollowerCount>팔로워 {followerCount.toLocaleString()}명</FollowerCount>
          </UserInfoWrapper>
        </UserContainer>
        <FollowButton isFollowing={isFollowing} onClick={toggleFollow} disabled={isLoading}/>
      </StreamerInfoContainer>
    </StreamInfoContainer>
  );
};

const StreamTitle = styled.span`
	font-size: ${({theme}) => theme.font.xxLarge};
	font-weight: 600;
	color: ${({theme}) => theme.colors.text.normal};
`;

const StreamInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 20px;
`;

const StreamerInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const UserProfile = styled.img`
  user-select: none;
  -webkit-user-drag: none;
  width: 60px;
  height: 60px;
  border-radius: ${({theme}) => theme.borders.maximum};
  &:hover {
    cursor: pointer;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 10px;
`

const UserName = styled.span`
  color: ${({theme}) => theme.colors.text.normal};
  font-size: ${({theme}) => theme.font.xLarge};
  font-weight: 800;
  border-radius: ${({theme}) => theme.borders.medium};
  padding: 5px 10px;
  user-select: none;
  
  &:hover {
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.content.normal};
  }
`;

const FollowerCount = styled.span`
  color: ${({theme}) => theme.colors.text.subtitle};
  font-size: ${({theme}) => theme.font.medium};
  padding: 5px 10px;
`;