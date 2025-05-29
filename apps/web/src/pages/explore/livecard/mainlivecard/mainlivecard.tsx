// import { MainLiveProps } from "./mainlivecard.props"
import { BadgeStatusContainer, CategoryText, CheckBadge, FollowCount, LiveChip, LiveChipText, LiveStatusContainer, MainLiveContainer, MainStreamerName, StreamInfo, ViewCount } from "./mainlivecard.style"
import Badge from '../../../../assets/badge.png'
import { ProfileImage, Spacer,  } from "../livecard.style"
import {  useNavigate } from "react-router-dom"
import {LiveStream} from "../../../main/main.tsx";
export const MainLiveCard = ({
    nickname,
    profileImage,
    badgeImage,
    // title,
    streamImage,
    // streamUrl
}:LiveStream) => {

    const navigate = useNavigate();

    const clickLive = () => {
        navigate('/livedetail');
    }

    return (
            <MainLiveContainer thumbnail={streamImage} onClick={clickLive}>
                <LiveStatusContainer>
                    <LiveChip>
                        <LiveChipText>LIVE</LiveChipText>
                    </LiveChip>
                    <ViewCount>{/*viewerCount*/0}명 시청중</ViewCount>
                </LiveStatusContainer>
                <CategoryText>{/*category*/"버츄얼"}</CategoryText>
                <Spacer />
                <StreamInfo>
                <ProfileImage src={profileImage}/>
                <div style={{display:'flex', flexDirection: 'column', marginBottom: 10}}>
                <BadgeStatusContainer>
                    <MainStreamerName>{nickname}</MainStreamerName>
                    {badgeImage && <CheckBadge src={Badge} />}
                </BadgeStatusContainer>
                <FollowCount>팔로워 {/*followerCount*/0}명</FollowCount>
                </div>
                </StreamInfo>
            </MainLiveContainer>
    )
}