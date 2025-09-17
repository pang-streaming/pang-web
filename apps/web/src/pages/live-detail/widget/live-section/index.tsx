import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { useIsMobile } from "@/entities/video/hooks/controller/useIsMobile";
import { useStreamDetail } from "./model/use-stream-detail";
import * as S from "./style";
import {
  StreamInfo,
  VideoPlayer,
  SponsorNotification,
} from "@/pages/live-detail/widget/live-section/widget";
import { useSponsorNotification } from "./model/use-sponsor-notification";


export const LiveSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId"));
  const navigate = useNavigate();

  const { streamData, isLoading } = useStreamDetail(streamId);
  const isMobile = useIsMobile();
  const { sponsorNotification, showSponsorNotification, hideSponsorNotification } = useSponsorNotification();

  return (
    <S.LiveDetailContainer>
      {isMobile && <FaChevronLeft size={24} onClick={() => navigate("/")} />}
      <S.ContentWrapper>
        {isLoading ? (
          <div>로딩중...</div>
        ) : streamData ? (
          <>
            <VideoPlayer streamUrl={streamData.url} isMobile={isMobile} />
            {/* <VideoPlayer streamUrl={streamData.url} isMobile={isMobile} /> */}
            <StreamInfo
              streamId={streamId}
              username={streamData.username}
              title={streamData.title}
              nickname={streamData.nickname}
            />
          </>
        ) : (
          <div>스트림 정보를 불러올 수 없습니다.</div>
        )}
        <SponsorNotification
          nickname={sponsorNotification.nickname}
          amount={sponsorNotification.amount}
          isVisible={sponsorNotification.isVisible}
        />
      </S.ContentWrapper>
    </S.LiveDetailContainer>
  );
};
