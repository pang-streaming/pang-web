import { useEffect, useState } from "react";
import { useSocket } from "./socket-provider";
import { randomColor } from "@/shared/random-color";


export interface ChatItem {
  viewerName: string;
  chatting: string;
  color: string;
  type?: 'message' | 'sponsor';
  sponsorAmount?: number;
}

export const useChat = (streamId: string) => {
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
          viewerName: data.nickname || data.username || "익명",
          chatting: `${data.amount?.toLocaleString()}개를 후원하셨습니다`,
          color: "#ff6b6b",
          type: 'sponsor',
          sponsorAmount: data.amount,
        },
      ]);
    };

    socket?.on("chat_message", handleChatMessage);
    socket?.on("sponsor_message", handleSponsorMessage);

    return () => {
      socket.off("connect", join);
      socket.off("chat_message", handleChatMessage);
      socket.off("sponsor_message", handleSponsorMessage);
    };
  }, [socket, streamId]);

  const sendMessage = (overrideMessage?: string) => {
    if (!socket || !socket.connected) return;
    const token = localStorage.getItem("accessToken");
    const messageToSend = overrideMessage ?? chat;
    const trimmedMessage = messageToSend.trim();
    if (!trimmedMessage || !token) return;
    socket.emit("chat_message", {
      token,
      message: trimmedMessage,
      roomId: streamId,
    });
    if (overrideMessage === undefined) {
      setChat("");
    }
  };

  const addSponsorMessage = (nickname: string, amount: number) => {
    setChatList((prev) => [
      ...prev,
      {
        viewerName: nickname,
        chatting: `${amount.toLocaleString()}개를 후원하셨습니다`,
        color: "#ff6b6b",
        type: 'sponsor',
        sponsorAmount: amount,
      },
    ]);

    if (socket && socket.connected) {
      socket.emit("sponsor_message", {
        nickname: nickname,
        amount: amount,
        roomId: streamId,
      });
    }
  };

  return { chat, setChat, chatList, sendMessage, addSponsorMessage };
};
