import * as S from "./style";
import {VideoCard} from "@/entities/video/ui/video-card";

export const Home = () => {
  return (
    <S.Container>
      <VideoCard
        streamId="11"
        title="title"
        url=""
        username="강연"
        nickname="강연"
        profileImage=""
        type="big"
      />
      <S.Title>이 방송 어때요?</S.Title>
      <S.GridContainer>
        <VideoCard
          streamId="11"
          title="title"
          url=""
          username="강연"
          nickname="강연"
          profileImage=""
          type="normal"
        />
      </S.GridContainer>
    </S.Container>
  );
};
