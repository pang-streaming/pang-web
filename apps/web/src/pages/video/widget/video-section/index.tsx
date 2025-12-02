import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { useIsMobile } from "@/entities/video/hooks/controller/useIsMobile";
import { useStreamDetail } from "@/pages/live-detail/widget/live-section/model/use-stream-detail";
import { VideoPlayer, StreamInfo } from "@/pages/live-detail/widget/live-section/widget";
import { Loading } from "@/widgets/fall-back";
import styled from "styled-components";

interface VideoSectionProps {
  streamId: string;
}

export const VideoSection = ({ streamId }: VideoSectionProps) => {
  const navigate = useNavigate();
  const { streamData, isLoading } = useStreamDetail(streamId);
  const isMobile = useIsMobile();

  return (
    <VideoSectionContainer>
      {isMobile && <BackButton onClick={() => navigate(-1)}><FaChevronLeft size={24} /></BackButton>}
      <ContentWrapper>
        {isLoading ? (
          <Loading />
        ) : streamData ? (
          <>
            <VideoPlayer streamUrl={streamData.url} isMobile={isMobile} isLive={false} />
            <StreamInfo
              streamId={streamId}
              username={streamData.username}
              title={streamData.title}
              nickname={streamData.nickname}
            />
          </>
        ) : (
          <ErrorMessage>영상 정보를 불러올 수 없습니다.</ErrorMessage>
        )}
      </ContentWrapper>
    </VideoSectionContainer>
  );
};

const VideoSectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text.normal};

  &:hover {
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
