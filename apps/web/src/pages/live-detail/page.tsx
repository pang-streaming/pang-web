import { ChattingSection } from "./widget/chatting-section";
import { SocketProvider } from "./widget/chatting-section/model/socket-provider";
import { LiveSection } from "./widget/live-section";

export const LiveDetail = () => {
  return (
    <SocketProvider>
      <div style={{display:'flex'}}>
        <LiveSection />
        <ChattingSection />
      </div>
    </SocketProvider>
  );
};
