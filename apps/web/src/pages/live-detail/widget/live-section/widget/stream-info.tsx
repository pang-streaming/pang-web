import nomalProfile from "@/app/assets/images/normal_profile.svg";
import styled from "styled-components";
import {FollowButton} from "@/shared/ui/button/follow-button";
import {useVideoCard} from "@/entities/video/hooks/controller/useVideoCard";
import { useMyFollower, useFollowUser, useMyFollowing } from "@/features/follow/hooks/useFollow";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@/entities/user/api/api";

interface StreamInfoProps {
	streamId: string;
	username: string;
  title?: string;
  nickname?: string;
}

export const StreamInfo = ({ streamId, username, title, nickname }: StreamInfoProps) => {
  const { data: followerData, isLoading } = useMyFollower(username);
  const queryClient = useQueryClient();
  const { mutate: followMutate, isPending } = useFollowUser();
  const followerCount = followerData?.data?.length ?? 0;
  const {handleOnClickProfile} = useVideoCard({streamId, username});

  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
  });

  const { data: myFollowingData } = useMyFollowing(myInfo?.data?.username);
  const userInfo = queryClient.getQueryData(["otherUserInfo", username]);
  const isFollowingFromAPI = (userInfo as any)?.data?.isFollowed ?? false;
  const isFollowingFromList = myFollowingData?.data?.some(following => following.username === username) ?? false;
  const isFollowing = isFollowingFromAPI || isFollowingFromList;
  
  const otherUserProfileImage = (userInfo as any)?.data?.profileImage;

  const toggleFollow = () => {
    followMutate({ username, isFollowing });
  };
	
  return (
    <StreamInfoContainer>
      <StreamTitle>{title ?? "제목 없는 방송"}</StreamTitle>
      <StreamerInfoContainer>
        <UserContainer>
          <UserProfile src={otherUserProfileImage || nomalProfile} onClick={handleOnClickProfile}/>
          <UserInfoWrapper>
            <UserName onClick={handleOnClickProfile}>{nickname || "unknown_user"}</UserName>
            <FollowerCount>팔로워 {followerCount.toLocaleString()}명</FollowerCount>
          </UserInfoWrapper>
        </UserContainer>
        <FollowButton isFollowing={isFollowing} onClick={toggleFollow} disabled={isLoading || isPending}/>
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