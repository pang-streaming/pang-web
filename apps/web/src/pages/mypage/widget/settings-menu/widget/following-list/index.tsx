
import { useMyFollowing, useFollowUser } from '@/features/follow/hooks/useFollow'
import { TabTitleText } from '@/shared/ui/tab-title-text'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { fetchMyInfo } from '@/entities/user/api/api'
import { useNavigate } from 'react-router-dom'
import normalProfile from '@/app/assets/images/normal_profile.svg'
import { SkeletonBox } from '@/shared/ui/skeleton'
import { FollowButton } from '@/shared/ui/button/follow-button'

export const FollowingList = () => {
  const navigate = useNavigate();
  const { mutate: followMutate, isPending } = useFollowUser();
  
  const { data: myInfo, isLoading: myInfoLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
  });

  const { data: myFollowing, isLoading: followingLoading, isError } = useMyFollowing(myInfo?.data?.username);

  console.log("myInfo:", myInfo);
  console.log("myFollowing:", myFollowing);

  const isLoading = myInfoLoading || followingLoading;

  if (isLoading) {
    return (
      <div>
        <TabTitleText>팔로잉 목록</TabTitleText>
        <FollowingListContainer>
          {Array.from({ length: 5 }).map((_, index) => (
            <FollowingItemSkeleton key={index} />
          ))}
        </FollowingListContainer>
      </div>
    );
  }

  if (isError || !myFollowing || !myFollowing.data) {
    return (
      <div>
        <TabTitleText>팔로잉 목록</TabTitleText>
        <FollowingListContainer>
          <EmptyMessage>팔로잉 목록을 불러올 수 없습니다.</EmptyMessage>
        </FollowingListContainer>
      </div>
    );
  }

  if (myFollowing.data.length === 0) {
    return (
      <div>
        <TabTitleText>팔로잉 목록</TabTitleText>
        <FollowingListContainer>
          <EmptyMessage>팔로우 중인 사용자가 없습니다.</EmptyMessage>
        </FollowingListContainer>
      </div>
    );
  }

  return (
    <div>
      <TabTitleText>팔로잉 목록</TabTitleText>
      <FollowingListContainer>
        {myFollowing.data.map((user) => (
        <FollowingListContainerRow key={user.username}>
          <FollowingItem onClick={() => navigate(`/profile/${user.username}`)}>
            <ProfileImage src={user.image || normalProfile} alt={user.nickname} />
            <UserInfo>
              <Nickname>{user.nickname}</Nickname>
              <Username>@{user.username}</Username>
              <FollowerCount>팔로워 {user.follower?.toLocaleString() || 0}명</FollowerCount>
            </UserInfo>
          </FollowingItem>
          <FollowButtonWrapper onClick={(e) => e.stopPropagation()}>
            <FollowButton 
              isFollowing={true} 
              disabled={isPending} 
              onClick={() => {
                followMutate(
                  { username: user.username, isFollowing: true },
                  {
                    onSuccess: () => {
                      alert(`@${user.username}님을 언팔로우했습니다.`);
                    },
                    onError: (error) => {
                      console.error("언팔로우 실패:", error);
                      alert("언팔로우에 실패했습니다.");
                    }
                  }
                );
              }}
            />
          </FollowButtonWrapper>
        </FollowingListContainerRow>
        ))}
      </FollowingListContainer>
    </div>
  );
};

const FollowingItemSkeleton = () => (
  <FollowingItem>
    <SkeletonBox width={50} height={50} radius="50%" />
    <UserInfo>
      <SkeletonBox width={120} height={20} radius={4} />
      <SkeletonBox width={80} height={16} radius={4} />
    </UserInfo>
  </FollowingItem>
);

const FollowingListContainer = styled.div`
    width: 95%;
    min-height: 400px;
    padding: 30px;
    border-radius: ${({theme}) => theme.borders.large};
    background-color: ${({theme}) => theme.colors.content.normal};
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const FollowingListContainerRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;

const FollowButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const FollowingItem = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border-radius: ${({theme}) => theme.borders.large};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.hover.light};
        transform: translateX(4px);
    }
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({theme}) => theme.colors.border.normal};
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Nickname = styled.span`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 700;
    color: ${({theme}) => theme.colors.text.normal};
`;

const Username = styled.span`
    font-size: ${({theme}) => theme.font.small};
    color: ${({theme}) => theme.colors.text.subtitle};
`;

const FollowerCount = styled.span`
    font-size: ${({theme}) => theme.font.small};
    color: ${({theme}) => theme.colors.text.subtitle};
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: ${({theme}) => theme.colors.text.subtitle};
    font-size: ${({theme}) => theme.font.large};
`;
