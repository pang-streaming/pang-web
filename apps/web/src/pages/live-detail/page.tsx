import { ChattingSection } from "./widget/chatting-section";
import { SocketProvider } from "./widget/chatting-section/model/socket-provider";
import { LiveSection } from "./widget/live-section";
import styled from "styled-components";

export const LiveDetail = () => {
  return (
    <LiveDetailContainer>
      <LiveSection />
      <ChattingSection />
    </LiveDetailContainer>
  );
};

const LiveDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
`;