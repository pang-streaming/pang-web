import { Video } from "../../../types/main.ts";
import * as S from "./livecard.style.ts";

export const LiveCard = ({ video }: { video: Video }) => {
  return (
    <>
        <S.LiveCardContainer key={video.id}>
          <S.Thumbnail src={video.thumbnail} />
          <S.Spacer />
          <S.LiveInfo>
            <S.ProfileImage src={video.profileImage} />
            <S.TitleContainer>
              <S.LiveTitle>{video.title}</S.LiveTitle> 
              <S.StreamerName>{video.streamer}</S.StreamerName>
            </S.TitleContainer>
          </S.LiveInfo>
        </S.LiveCardContainer>
    </>
  );
};