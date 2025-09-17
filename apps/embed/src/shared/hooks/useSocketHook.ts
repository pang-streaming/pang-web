import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

import type { IDonationMessageResponse } from "../../entities/donation/IDonationMessageResponse";
import type { IChatMessageResponse } from "../../entities/chat/IChatMessageResponse";

interface UseSocketProps {
  roomId: string;
  onDonation?: (data: IDonationMessageResponse) => void;
  onChat?: (data: IChatMessageResponse) => void;
}

export const useSocket = ({ roomId, onDonation, onChat }: UseSocketProps) => {
  useEffect(() => {
    const socket: Socket = io("https://pang-chat.euns.dev", {
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false,
    });

    socket.on("connect", () => {
      console.log("connected", socket.id);
      socket.emit("join_room", roomId);
    });

    if (onDonation) {
      socket.on("donation_message", (data: IDonationMessageResponse) => {
        onDonation(data);
      });
    }

    if (onChat) {
      socket.on("chat_message", (data: IChatMessageResponse) => {
        console.log(data)
        onChat(data);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [roomId, onDonation, onChat]);
};
