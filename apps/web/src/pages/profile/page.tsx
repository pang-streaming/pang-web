import { useParams } from "react-router-dom";
import styled from "styled-components";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import { FollowButton } from "@/shared/ui/button/follow-button";
import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
import { useEffect, useState, useMemo } from "react";
import { ProfileHomeWidget } from "@/pages/profile/widget/profile-home-widget";
import { ProfileVideoWidget } from "@/pages/profile/widget/profile-video-widget";
import { ProfileCommunityWidget } from "@/pages/profile/widget/profile-community-widget";
import { ProfileInfoWidget } from "@/pages/profile/widget/profile-info-widget";
import { useFollowUser, useMyFollowing } from "@/features/follow/hooks/useFollow";
import { useUsernameToInfo } from "./hook/useProfile";
import { ErrorScreen } from "@/shared/ui/error-screen";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@/entities/user/api/api";
import { SkeletonBox } from "@/shared/ui/skeleton";

const allSegments: Segment[] = [
  { id: "home", name: "홈" },
  { id: "video", name: "동영상" },
  { id: "community", name: "커뮤니티" },
  { id: "info", name: "정보" },
];

const getStoredTab = (username: string, availableSegments: Segment[]): string => {
	const storageKey = `profile-tab-${username}`;
	const storedTab = sessionStorage.getItem(storageKey);
	// 저장된 탭이 현재 사용 가능한 탭에 있는지 확인
	const isTabAvailable = availableSegments.some(seg => seg.id === storedTab);
	return isTabAvailable ? storedTab! : availableSegments[0].id;
};

const storeTab = (username: string, tabId: string): void => {
	const storageKey = `profile-tab-${username}`;
	sessionStorage.setItem(storageKey, tabId);
};

export const ProfilePage = () => {
	const { username } = useParams<{ username: string }>();
	const queryClient = useQueryClient();
	const { mutate: followMutate, isPending } = useFollowUser();
	
	const { data: myInfo } = useQuery({
		queryKey: ["myInfo"],
		queryFn: fetchMyInfo,
	});
	
	const {
	  data: userInfo,
	  isLoading,
	  isError,
	  error,
	} = useUsernameToInfo({ username: username! });

	// communityId에 따라 segments 동적 생성
	const segments = useMemo(() => {
		if (!userInfo?.data?.communityId) {
			// communityId가 null이면 커뮤니티 탭 제외
			return allSegments.filter(seg => seg.id !== "community");
		}
		return allSegments;
	}, [userInfo?.data?.communityId]);

	const [activeTabId, setActiveTabId] = useState<string>(() => 
		username ? getStoredTab(username, allSegments) : allSegments[0].id
	);
	
	// userInfo 로딩 후 segments 변경 시 activeTabId 재조정
	useEffect(() => {
		if (username && segments.length > 0) {
			const storedTab = getStoredTab(username, segments);
			setActiveTabId(storedTab);
		}
	}, [username, segments]);
	
	const handleTabChange = (tabId: string) => {
		setActiveTabId(tabId);
		if (username) {
			storeTab(username, tabId);
		}
	};

	const { data: myFollowingData } = useMyFollowing(myInfo?.data?.username);
	
	const isFollowingFromAPI = userInfo?.data?.isFollowed ?? false;
	const isFollowingFromList = myFollowingData?.data?.some(following => following.username === username) ?? false;
	const isFollowing = isFollowingFromAPI || isFollowingFromList;
	
	console.log("팔로우 상태 확인:", {
		username,
		isFollowingFromAPI,
		isFollowingFromList,
		isFollowing,
		userInfo: userInfo?.data
	});

	const toggleFollow = () => {
		if (!username) return;
		followMutate(
			{ username, isFollowing },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["otherUserInfo", username] });
					queryClient.invalidateQueries({ queryKey: ["myFollowing", myInfo?.data?.username] });
					alert(isFollowing ? "언팔로우했습니다." : "팔로우했습니다! 🎉");
				},
				onError: (error) => {
					console.error("팔로우 실패:", error);
					alert("팔로우 요청에 실패했습니다.");
				}
			}
		);
	};

	if (isLoading) {
		return (
			<ProfileContainer>
		<UserInfoContainer>
		  <UserInfoWrapper>
          <SkeletonBox width={90} height={94} radius={999} />
			<UserInfo>
			<SkeletonBox width={100} height={30} radius={6} />
			<SkeletonBox width={40} height={20} radius={6} />
			<SkeletonBox width={40} height={20} radius={6} />

			</UserInfo>
		  </UserInfoWrapper>
		  <FollowButton
			isFollowing={isFollowing}
			disabled={isLoading || isPending}
			onClick={toggleFollow}
		  />
		</UserInfoContainer>
  
		<SegmentButtonGroup
	  segments={allSegments}
	  defaultSegmentIndex={allSegments.findIndex(s => s.id === activeTabId)}
	  onSegmentChange={handleTabChange}
	/>

	{activeTabId === "home" && <SkeletonBox width={100} height={100} radius={6} />}
	{activeTabId === "video" && <SkeletonBox width={100} height={100} radius={6} />}
	{activeTabId === "community" && <SkeletonBox width={100} height={100} radius={6} />}
	{activeTabId === "info" && <SkeletonBox width={100} height={100} radius={6} />}
  </ProfileContainer>
	)
}
if (isError || !userInfo) return <ErrorScreen error={String(error)} />;

	const communityId = userInfo.data.communityId;

	console.log(userInfo);
	return (
	  <ProfileContainer>
		<UserInfoContainer>
		  <UserInfoWrapper>
			<ProfileImage src={userInfo.data.profileImage || normalProfile} />
			<UserInfo>
			  <NickName>{userInfo.data.nickname}</NickName>
			  <UserFollowers>팔로워 {userInfo.data.followerCount?.toLocaleString()}명</UserFollowers>
			  <UserDescription>{userInfo.data.description || ""}</UserDescription>
			</UserInfo>
		  </UserInfoWrapper>
		  <FollowButton
			isFollowing={isFollowing}
			disabled={isLoading || isPending}
			onClick={toggleFollow}
		  />
		</UserInfoContainer>
  
	<SegmentButtonGroup
	  segments={segments}
	  defaultSegmentIndex={segments.findIndex(s => s.id === activeTabId)}
	  onSegmentChange={handleTabChange}
	/>
  
	{activeTabId === "home" && <ProfileHomeWidget username={username || ""} />}
	{activeTabId === "video" && <ProfileVideoWidget username={username || ""}/>}
	{activeTabId === "community" && communityId && <ProfileCommunityWidget communityId={communityId} />}
	{activeTabId === "info" && <ProfileInfoWidget />}
  </ProfileContainer>
);
};
  

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const UserInfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10;
`;

const UserInfo = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
`;

const NickName = styled.span`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.xxxLarge};
  font-weight: bolder;
`;

const UserDescription = styled.span`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.large};
`;

const UserFollowers = styled.span`
  color: ${({ theme }) => theme.colors.text.placeholder};
  font-size: ${({ theme }) => theme.font.medium};
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borders.maximum};
`;
