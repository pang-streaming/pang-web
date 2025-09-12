import { TabTitleText } from "@/shared/ui/tab-title-text";
import { VideoCard } from "../../entities/video/ui/video-card";
import * as S from "./style";

export const Explore = () => {
  return (
    <S.Container>
      <S.Title>이 방송 어때요?</S.Title>
      <S.GridContainer>
        <VideoCard
          streamId="11"
          title="title"
          url=""
          username="강연"
          nickname="강연"
          profileImage=""
        />
         <VideoCard
          streamId="11"
          title="title"
          url=""
          username="강연"
          nickname="강연"
          profileImage=""
        />
         <VideoCard
          streamId="11"
          title="title"
          url=""
          username="강연"
          nickname="강연"
          profileImage=""
        />
      </S.GridContainer>
    </S.Container>
  );
};
