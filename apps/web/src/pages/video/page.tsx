import { useLocation } from "react-router-dom";
import { VideoSection } from "./widget/video-section";
import styled from "styled-components";

export const VideoDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId"));

  return (
    <VideoDetailContainer>
      <VideoSection streamId={streamId} />
    </VideoDetailContainer>
  );
};

const VideoDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;
