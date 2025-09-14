import {useParams} from "react-router-dom";
import styled from "styled-components";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import {FollowButton} from "@/shared/ui/button/follow-button";
import {Segment, SegmentButtonGroup} from "@pang/shared/ui";
import {useState} from "react";
import {ProfileHomeWidget} from "@/pages/profile/widget/profile-home-widget";
import {ProfileVideoWidget} from "@/pages/profile/widget/profile-video-widget";
import {ProfileCommunityWidget} from "@/pages/profile/widget/profile-community-widget";
import {ProfileInfoWidget} from "@/pages/profile/widget/profile-info-widget";

const segments: Segment[] = [
	{
		id: "home",
		name: "홈",
	},
	{
		id: "video",
		name: "동영상",
	},
	{
		id: "community",
		name: "커뮤니티",
	},
	{
		id: "info",
		name: "정보",
	}
]

export const ProfilePage = () => {
	const {id} = useParams();
	const [activeTabId, setActiveTabId] = useState<string>(segments[0].id);
	
	return (
		<ProfileContainer>
			<UserInfoContainer>
				<UserInfoWrapper>
					<ProfileImage src={normalProfile}/>
					<UserInfo>
						<NickName>테스트</NickName>
						<UserFollowers>12.5만명</UserFollowers>
						<UserDescription>asdasdsadsadasdasd</UserDescription>
					</UserInfo>
				</UserInfoWrapper>
				<FollowButton isFollowing={false} disabled={false} onClick={() => console.log("follow")}/>
			</UserInfoContainer>
			<SegmentButtonGroup segments={segments} onSegmentChange={setActiveTabId}/>
			{activeTabId === 'home' && <ProfileHomeWidget/>}
			{activeTabId === 'video' && <ProfileVideoWidget/>}
			{activeTabId === 'community' && <ProfileCommunityWidget/>}
			{activeTabId === 'info' && <ProfileInfoWidget/>}
		</ProfileContainer>
	)
}

const ProfileContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	box-sizing: border-box;
	max-width: 1300px;
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
		gap: 10
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
	color: ${({theme}) => theme.colors.text.normal};
	font-size: ${({theme}) => theme.font.xxxLarge};
	font-weight: bolder;
`;

const UserDescription = styled.span`
	color: ${({theme}) => theme.colors.text.subtitle};
	font-size: ${({theme}) => theme.font.large};
`

const UserFollowers = styled.span`
    color: ${({theme}) => theme.colors.text.placeholder};
    font-size: ${({theme}) => theme.font.medium};
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${({theme}) => theme.borders.maximum};
`