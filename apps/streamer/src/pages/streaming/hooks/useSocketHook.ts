import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import type { IDonationMessageResponse } from "@/entities/donation/IDonationMessageResponse";
import type { IChatMessageResponse } from "@/entities/chat/IChatMessageResponse";

interface UseSocketProps {
  roomId: string;
  onDonation?: (data: IDonationMessageResponse) => void;
  onChat?: (data: IChatMessageResponse) => void;
}

export const useSocket = ({ roomId, onDonation, onChat }: UseSocketProps) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };
  
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false,
    });

    socketRef.current = socket;

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
        console.log(data);
        onChat(data);
      });
    }

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, onDonation, onChat]);

  const sendMessage = (message: string) => {
    if (!socketRef.current || !socketRef.current.connected) {
      console.warn("Socket not connected");
      return;
    }
    const token = getCookie("accessToken");
    if (!token) {
      console.warn("Token not found");
      return;
    }
    socketRef.current.emit("chat_message", { message, roomId, token: String(token) });
  };

  return { sendMessage };
};
