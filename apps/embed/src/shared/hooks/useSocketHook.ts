import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

import type { IDonationMessageResponse } from "../../entities/donation/IDonationMessageResponse";


export const useSocket = (
  roomId: string,
  onDonation: (data: IDonationMessageResponse) => void
) => {
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

    socket.on("donation_message", (data: IDonationMessageResponse) => {
      onDonation(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, onDonation]);
};
