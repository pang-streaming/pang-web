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
  if (type === "big") {
    return (
      <S.BigLiveCardContainer>
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

  // 기존 normal 타입은 그대로
  return (
    <S.LiveCardContainer onClick={() => {}}>
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
