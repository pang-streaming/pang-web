import { ChattingSection } from "./widget/chatting-section";
import { SocketProvider } from "./widget/chatting-section/model/socket-provider";
import { LiveSection } from "./widget/live-section";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export const LiveDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId"));

  return (
    <SocketProvider>
      <LiveDetailContainer>
        <LiveSection />
        <ChattingSection streamId={streamId} />
      </LiveDetailContainer>
    </SocketProvider>
  );
};

const LiveDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
`;