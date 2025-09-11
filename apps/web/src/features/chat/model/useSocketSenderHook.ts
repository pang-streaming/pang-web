import { useSocket } from "@/pages/live-detail/widget/chatting-section/model/socket-provider";
import { useCallback } from "react";


function useSocketSender(channel: string) {
  const socket = useSocket(); 
  
  const emitter = useCallback((data: unknown) => {
    if (!socket || !socket.connected) {
      console.warn(`Socket is not connected. Cannot emit to channel: ${channel}`);
      return;
    }
    
    socket.emit(channel, data);
  }, [socket, channel]);
  
  return emitter;
}

export default useSocketSender;