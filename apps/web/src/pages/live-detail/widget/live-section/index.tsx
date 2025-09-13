import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { useIsMobile } from "@/entities/video/model/useIsMobile";
import { useStreamDetail } from "./model/useStreamDetail";
import * as S from "./style";
import {StreamInfo, VideoPlayer} from "@/pages/live-detail/widget/live-section/widget";

export const LiveSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId"));
  const navigate = useNavigate();

  const { streamData } = useStreamDetail(streamId);
  const isMobile = useIsMobile();
  return (
    <S.LiveDetailContainer>
      {isMobile && <FaChevronLeft size={24} onClick={() => navigate("/")} />}
      <S.ContentWrapper>
        <VideoPlayer streamUrl={streamData?.url} isMobile={isMobile} />
        <StreamInfo
          title={streamData?.title}
          nickname={streamData?.nickname}
        />
      </S.ContentWrapper>
    </S.LiveDetailContainer>
  );
};
