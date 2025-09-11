import { useNavigate } from "react-router-dom";
import type { Video } from "../../model/type";
import * as S from "./style";
import normalProfile from "@/app/assets/images/normal_profile.svg";

interface VideoCardProps extends Video {
  type?: "normal" | "big";
}

export const VideoCard = ({
  streamId,
  title,
  url,
  username,
  nickname,
  profileImage,
  type = "normal",
}: VideoCardProps) => {
  const navigate = useNavigate();
  const goToStream = () => {
    console.log(streamId);
    navigate(`/livedetail?streamId=${streamId}`);
  };
  if (type === "big") {
    return (
      <S.BigLiveCardContainer onClick={goToStream}>
        <S.CategoryTitle>마인크래프트</S.CategoryTitle>
        <S.LiveInfo>
          <S.ProfileImage src={profileImage || normalProfile} />
          <S.TitleContainer>
            <S.LiveTitle>{title}</S.LiveTitle>
            <S.StreamerName>{nickname}</S.StreamerName>
          </S.TitleContainer>
        </S.LiveInfo>
      </S.BigLiveCardContainer>
    );
  }

  return (
    <S.LiveCardContainer onClick={goToStream}>
      <S.EmptyText>방송 준비중입니다.</S.EmptyText>
      <S.LiveInfo>
        <S.ProfileImage src={profileImage || normalProfile} />
        <S.TitleContainer>
          <S.LiveTitle>{title}</S.LiveTitle>
          <S.StreamerName>{nickname}</S.StreamerName>
        </S.TitleContainer>
      </S.LiveInfo>
    </S.LiveCardContainer>
  );
};
