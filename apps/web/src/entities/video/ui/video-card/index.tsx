import type { Video } from "../../model/type";
import * as S from "./style";

interface VideoCardProps extends Video {
  type: "normal" | "big"
}

export const VideoCard = ({
  streamId,
  title,
  url,
  username,
  nickname,
  profileImage,
  type = 'normal'
}: VideoCardProps) => {
  return (
    <S.LiveCardContainer onClick={() => {}}>
      {/* {streamImage ? (
            <S.Thumbnail src={streamImage} />
          ) : ( */}
      <span
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        방송 준비중입니다.
      </span>
      <S.Spacer />
      <S.LiveInfo>
        <S.ProfileImage src={profileImage || ""} />
        <S.TitleContainer>
          <S.LiveTitle>{title}</S.LiveTitle>
          <S.StreamerName>{nickname}</S.StreamerName>
        </S.TitleContainer>
      </S.LiveInfo>
    </S.LiveCardContainer>
  );
};
