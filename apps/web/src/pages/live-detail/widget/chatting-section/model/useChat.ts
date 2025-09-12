import { useEffect, useState } from "react";
import { useSocket } from "./socket-provider";
import { randomColor } from "@/shared/random-color";


export interface ChatItem {
  viewerName: string;
  chatting: string;
  color: string;
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
          viewerName: data.username,
          chatting: data.message,
          color: randomColor(),
        },
      ]);
    };

    socket?.on("chat_message", handleChatMessage);

    return () => {
      socket.off("connect", join);
      socket.off("chat_message", handleChatMessage);
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

  return { chat, setChat, chatList, sendMessage };
};
