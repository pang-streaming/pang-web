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
    socket?.emit("join_room", streamId);
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
      socket?.off("chat_message", handleChatMessage);
    };
  }, [socket, streamId]);

  const sendMessage = () => {
    const token = localStorage.getItem("accessToken");
    const trimmedMessage = chat.trim();
    if (!trimmedMessage || !token) return;
    socket?.emit("chat_message", {
      token,
      message: trimmedMessage,
      roomId: streamId,
    });
    setChat("");
  };

  return { chat, setChat, chatList, sendMessage };
};
