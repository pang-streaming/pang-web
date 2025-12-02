import { useEffect, useState } from "react";
import { useSocket } from "./socket-provider";
import { randomColor } from "@/shared/random-color";


export interface ChatItem {
  viewerName: string;
  chatting: string;
  color: string;
  type?: 'message' | 'sponsor';
  sponsorAmount?: number;
  message?: string;
}
export interface ISendDonationMessageRequest {
  token?: string
  roomId: string;   
  message?: string; 
  amount: number;   
  voiceId?: string; 
  youtube?: string;
}


export const useChat = (streamId: string) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };
  
  const socket = useSocket();
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    if (!socket || !streamId) return;

    const join = () => {
      socket.emit("join_room", streamId);
    };

    if (socket.connected) {
      join();
    }

    socket.on("connect", join);
    const handleChatMessage = (data: any) => {
      setChatList((prev) => [
        ...prev,
        {
          viewerName: data.nickname,
          chatting: data.message,
          color: randomColor(),
          type: 'message',
        },
      ]);
    };

    const handleSponsorMessage = (data: any) => {
      console.log("받은 후원 메시지:", data);
      setChatList((prev) => [
        ...prev,
        {
          viewerName: data.nickname || "익명",
          chatting: `${data.amount?.toLocaleString()}개를 후원하셨습니다`,
          color: "#ff6b6b",
          type: 'sponsor',
          sponsorAmount: data.amount,
          message: data.message
        },
      ]);
    };

    socket?.on("chat_message", handleChatMessage);
    socket?.on("donation_message", handleSponsorMessage);

    return () => {
      socket.off("connect", join);
      socket.off("chat_message", handleChatMessage);
      socket.off("donation_message", handleSponsorMessage);
    };
  }, [socket, streamId]);

  const sendMessage = (overrideMessage?: string) => {
    if (!socket || !socket.connected) {
      console.warn("Socket is not connected");
      return;
    }
    const token = getCookie("accessToken");
    const messageToSend = overrideMessage ?? chat;
    const trimmedMessage = messageToSend.trim();
    if (!trimmedMessage) {
      console.warn("Message is empty");
      return;
    }
    if (!token) {
      console.warn("Access token is missing");
      return;
    }
    console.log("Sending message:", { token: token ? "exists" : "missing", message: trimmedMessage, roomId: streamId });
    socket.emit("chat_message", {
      token,
      message: trimmedMessage,
      roomId: streamId,
    });
    if (overrideMessage === undefined) {
      setChat("");
    }
  };

  const addSponsorMessage = (data:ISendDonationMessageRequest) => {
    if (socket && socket.connected) {
      data.token = String(getCookie("accessToken"));
      socket.emit("send_donation", data);
    }
  };

  return { chat, setChat, chatList, sendMessage, addSponsorMessage };
};
