import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./style";
import { ChatInput } from "./ui/chat-input";
import { useChat } from "./model/useChat";
import ChattingArrow from "@/app/assets/chatting-arrow.svg?react";
import {GoKebabHorizontal} from "react-icons/go";

export const ChattingSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId") ?? "");

  const { chatList, setChat, sendMessage } = useChat(streamId);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  return (
    <S.ChattingContainer>
      <S.ChattingHeader>
        <ChattingArrow />
        <S.ChattingHeaderText>
          채팅
        </S.ChattingHeaderText>
        <GoKebabHorizontal />
      </S.ChattingHeader>

      <S.ChatMessages>
        {chatList.map((item, index) => (
          <S.MessageRow key={index}>
            <S.Nickname style={{ color: item.color }}>
              {item.viewerName ?? "익명"}
            </S.Nickname>
            <S.Message>{item.chatting}</S.Message>
          </S.MessageRow>
        ))}
        <div ref={messagesEndRef} />
      </S.ChatMessages>

      <ChatInput
        onSend={(message: string) => {
          sendMessage(message);
        }}
      />
    </S.ChattingContainer>
  );
};
