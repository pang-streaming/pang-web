import { MainLiveProps } from "./mainlivecard.props"
import { BadgeStatusContainer, CategoryText, CheckBadge, FollowCount, LiveChip, LiveChipText, LiveStatusContainer, MainLiveContainer, MainStreamerName, StreamInfo, ViewCount } from "./mainlivecard.style"
import Badge from '../../../../assets/badge.png'
import { ProfileImage, Spacer,  } from "../livecard.style"
import {  useNavigate } from "react-router-dom"
export const MainLiveCard = ({
    thumbnail,
    profileImage,
    streamerName,
    followerCount,
    viewerCount,
    category,
    badge
}:MainLiveProps) => {

    const navigate = useNavigate();

    const clickLive = () => {
        navigate('/livedetail');
    }

    return (
            <MainLiveContainer thumbnail={thumbnail} onClick={clickLive}>
                <LiveStatusContainer>
                    <LiveChip>
                        <LiveChipText>LIVE</LiveChipText>
                    </LiveChip>
                    <ViewCount>{viewerCount}명 시청중</ViewCount>
                </LiveStatusContainer>
                <CategoryText>{category}</CategoryText>
                <Spacer />
                <StreamInfo>
                <ProfileImage src={profileImage}/>
                <div style={{display:'flex', flexDirection: 'column', marginBottom: 10}}>
                <BadgeStatusContainer>
                    <MainStreamerName>{streamerName}</MainStreamerName>
                    {badge && <CheckBadge src={Badge} />}
                </BadgeStatusContainer>
                <FollowCount>팔로워 {followerCount}명</FollowCount>
                </div>
                </StreamInfo>
            </MainLiveContainer>
    )
}