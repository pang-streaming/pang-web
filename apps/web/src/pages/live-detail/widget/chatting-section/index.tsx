import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./style";
import { ChatInput } from "./ui/chat-input";
import { useChat } from "./model/use-chat";
import ChattingArrow from "@/app/assets/chatting-arrow.svg?react";
import { GoKebabHorizontal } from "react-icons/go";
import { getSponsorColor } from "@/shared/lib/sponsor-color";
import { IStreamDataResponse } from "@/entities/video/model/type";
import { getStreamData } from "@/entities/video/api/api";



export const ChattingSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamIdParam = queryParams.get("streamId");

  const [streamData, setStreamData] = useState<IStreamDataResponse | null>(null);

  const { chatList, setChat, sendMessage, addSponsorMessage } = useChat(
    streamData?.username ?? ""
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!streamIdParam) return;

    const fetchStreamData = async () => {
      try {
        const data = await getStreamData(streamIdParam);
        setStreamData(data);
      } catch (err) {
        console.error("스트림 데이터 불러오기 실패", err);
      }
    };

    fetchStreamData();
  }, [streamIdParam]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  if (!streamData) return <div>Loading...</div>;

  return (
    <S.ChattingContainer>
      <S.ChattingHeader>
        <ChattingArrow />
        <S.ChattingHeaderText>채팅</S.ChattingHeaderText>
        <GoKebabHorizontal />
      </S.ChattingHeader>

      <S.ChatMessages>
        {chatList.map((item, index) => {
          const sponsorColor =
            item.type === "sponsor" && item.sponsorAmount
              ? getSponsorColor(item.sponsorAmount)
              : null;

          return (
            <S.MessageRow key={index}>
              {item.type === "sponsor" ? (
                <S.SponsorMessage
                  style={{
                    background: sponsorColor?.background,
                    boxShadow: `0 2px 8px ${sponsorColor?.shadowColor}`,
                  }}
                >
                  <S.SponsorIcon>💣</S.SponsorIcon>
                  <S.SponsorText>
                    <S.SponsorNickname style={{ color: sponsorColor?.textColor }}>
                      {item.viewerName}
                    </S.SponsorNickname>
                    님이 {item.sponsorAmount?.toLocaleString()}개를 후원하셨습니다!
                    {item.message && (
                      <S.SponsorMessageText>
                        "{item.message}"
                      </S.SponsorMessageText>
                    )}
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
        username={streamData?.username}
        onSend={(message: string) => sendMessage(message)}
        addSponsorMessage={addSponsorMessage}
      />
    </S.ChattingContainer>
  );
};
