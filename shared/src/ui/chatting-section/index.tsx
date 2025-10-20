import { useEffect, useRef } from "react";
import * as S from "./style";
import { ChatInput } from "./ui/chat-input";
import { GoKebabHorizontal } from "react-icons/go";
import { getSponsorColor } from "../../lib/sponsor-color";

interface ChattingSectionProps {
  streamId: string;
  username: string;
  chatList: any[];
  sendMessage: (message: string) => void;
  addSponsorMessage: (data: any) => void;
  ChattingArrowIcon?: React.ComponentType;
  fetchMyInfo: () => Promise<any>;
  paymentApi: any;
  sendPungIcon?: string;
  AirplaneIcon?: React.ComponentType;
}

export const ChattingSection = ({
  streamId,
  username,
  chatList,
  sendMessage,
  addSponsorMessage,
  ChattingArrowIcon,
  fetchMyInfo,
  paymentApi,
  sendPungIcon,
  AirplaneIcon,
}: ChattingSectionProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  return (
    <S.ChattingContainer>
      <S.ChattingHeader>
        {ChattingArrowIcon && <ChattingArrowIcon />}
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
        username={username}
        onSend={(message: string) => sendMessage(message)}
        addSponsorMessage={addSponsorMessage}
        voiceId=""
        fetchMyInfo={fetchMyInfo}
        paymentApi={paymentApi}
        sendPungIcon={sendPungIcon}
        AirplaneIcon={AirplaneIcon}
      />
    </S.ChattingContainer>
  );
};
