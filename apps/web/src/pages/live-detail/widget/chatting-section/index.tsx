// ChattingSection.tsx
import { useMessages } from "./model/useChatMessages";
import * as S from "./style";
import { ChatInput } from "./ui/chat-input";



export const ChattingSection = () => {
  const { messages, handleSend, messagesEndRef } = useMessages();


  const colors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#A66DD4"];

  const getColorForNickname = (nickname: string) => {
    const index = nickname
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (

      <S.Container>
        <S.ChattingHeader>
          <S.ChattingArrow />
          <span style={{ fontSize: 15, fontWeight: 700, color: "#a3a3a3" }}>
            채팅
          </span>
        </S.ChattingHeader>

        <S.ChatMessages>
          {messages.map((msg, index) => {
            const nickname = "강연";
            const nicknameColor = getColorForNickname(nickname);
            return (
              <S.MessageRow key={index}>
                <S.Nickname style={{ color: nicknameColor }}>
                  {nickname}
                </S.Nickname>
                <S.Message>{msg}</S.Message>
              </S.MessageRow>
            );
          })}
          <div ref={messagesEndRef} />
        </S.ChatMessages>

        <ChatInput onSend={handleSend} />
      </S.Container>

  );
};
