import * as S from "./mainlivecard.style";
import * as LC from "../livecard.style";
import Badge from "../../../../assets/badge.png";
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
    <S.MainLiveContainer thumbnail={streamImage} onClick={clickLive}>
      <S.LiveStatusContainer>
        <S.LiveChip>
          <S.LiveChipText>LIVE</S.LiveChipText>
        </S.LiveChip>
        <S.ViewCount>0명 시청중</S.ViewCount>
      </S.LiveStatusContainer>

      <S.CategoryText>category</S.CategoryText>

      <LC.Spacer />

      <S.StreamInfo>
        <LC.ProfileImage src={profileImage} />
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
          <S.BadgeStatusContainer>
            <S.MainStreamerName>{nickname}</S.MainStreamerName>
            {badgeImage && <S.CheckBadge src={Badge} />}
          </S.BadgeStatusContainer>
          <S.FollowCount>팔로워 0명</S.FollowCount>
        </div>
      </S.StreamInfo>
    </S.MainLiveContainer>
  );
};