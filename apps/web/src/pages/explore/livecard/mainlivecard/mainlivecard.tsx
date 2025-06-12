import {
    BadgeStatusContainer,
    CategoryText,
    CheckBadge,
    FollowCount,
    LiveChip,
    LiveChipText,
    LiveStatusContainer,
    MainLiveContainer,
    MainStreamerName,
    StreamInfo,
    ViewCount,
  } from "./mainlivecard.style";
  import Badge from '../../../../assets/badge.png';
  import { ProfileImage, Spacer } from "../livecard.style";
  import { useNavigate } from "react-router-dom";
import { Video } from "../../../../types/video";
  
  
  export const MainLiveCard = ({
    nickname,
    profileImage,
    badgeImage,
    title,
    streamImage,
    streamUrl,
  }: Video) => {
    const navigate = useNavigate();
  
    const clickLive = () => {
      navigate("/livedetail");
    };
  
    return (
      <MainLiveContainer thumbnail={streamImage} onClick={clickLive}>
        <LiveStatusContainer>
          <LiveChip>
            <LiveChipText>LIVE</LiveChipText>
          </LiveChip>
          <ViewCount>0명 시청중</ViewCount>
        </LiveStatusContainer>
        <CategoryText>category</CategoryText>
        <Spacer />
        <StreamInfo>
          <ProfileImage src={profileImage} />
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
            <BadgeStatusContainer>
              <MainStreamerName>{nickname}</MainStreamerName>
              {badgeImage && <CheckBadge src={Badge} />}
            </BadgeStatusContainer>
            <FollowCount>팔로워 0명</FollowCount>
          </div>
        </StreamInfo>
      </MainLiveContainer>
    );
  };