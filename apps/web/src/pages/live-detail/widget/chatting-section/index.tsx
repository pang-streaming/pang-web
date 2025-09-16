import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./style";
import { ChatInput } from "./ui/chat-input";
import { useChat } from "./model/use-chat";
import ChattingArrow from "@/app/assets/chatting-arrow.svg?react";
import {GoKebabHorizontal} from "react-icons/go";
import { getSponsorColor } from "@/shared/lib/sponsor-color";


export const ChattingSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId") ?? "");

  const { chatList, setChat, sendMessage, addSponsorMessage } = useChat(streamId);

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
        {chatList.map((item, index) => {
          const sponsorColor = item.type === 'sponsor' && item.sponsorAmount 
            ? getSponsorColor(item.sponsorAmount) 
            : null;
          
          return (
            <S.MessageRow key={index}>
              {item.type === 'sponsor' ? (
                <S.SponsorMessage 
                  style={{
                    background: sponsorColor?.background,
                    boxShadow: `0 2px 8px ${sponsorColor?.shadowColor}`
                  }}
                >
                  <S.SponsorIcon>💣</S.SponsorIcon>
                  <S.SponsorText>
                    <S.SponsorNickname style={{ color: sponsorColor?.textColor }}>
                      {item.viewerName}
                    </S.SponsorNickname>
                    님이 {item.sponsorAmount?.toLocaleString()}개를 후원하셨습니다!
                  </S.SponsorText>
                </S.SponsorMessage>
              ) : (
                <>
                  <S.Nickname style={{ color: item.color }}>
                    {item.viewerName ?? "익명"}
                  </S.Nickname>
                  <S.Message>{item.chatting}</S.Message>
                </>
              )}
            </S.MessageRow>
          );
        })}
        <div ref={messagesEndRef} />
      </S.ChatMessages>

      <ChatInput
        onSend={(message: string) => {
          sendMessage(message);
        }}
        addSponsorMessage={addSponsorMessage}
      />
    </S.ChattingContainer>
  );
};
