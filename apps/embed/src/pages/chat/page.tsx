import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSocket } from "../../shared/hooks/useSocketHook";
import type { IChatMessageResponse } from "../../entities/chat/IChatMessageResponse";
import { useLocation } from "react-router-dom";

export const ChatPage = () => {
  const [messages, setMessages] = useState<IChatMessageResponse[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = String(queryParams.get("username"));

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const randomColor = (): string => {
    let color = "";
    do {
      color = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    } while (color === "#000000" || color === "#ffffff");
    return color;
  }

  useSocket({
    roomId,
    onChat: (data) => handleChat(data),
  });

  const handleChat = (data: IChatMessageResponse) => {
    data.color = randomColor();
    setMessages((prev) => [...prev, data]);
  }

  useEffect(() => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  }, [messages]);

  return (
    <PageWrapper>
      <ChatContainer ref={chatContainerRef}>
        {messages.map((m, index) => (
          <MessageBubble key={m.id} delay={index * 0.02}>
            <Nickname style={{ color: m.color }}>{m.nickname}</Nickname> <MessageText>{m.message}</MessageText>
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </ChatContainer>
    </PageWrapper>
  );
};

const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: transparent;
  overflow: hidden;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  flex: 1;
  height: 100%;
`;

const MessageBubble = styled.div<{ delay?: number }>`
  margin-bottom: 8px;
  opacity: 0;
  transform: translateX(-30px);
  animation: ${slideFromLeft} 0.3s ease-out forwards;
  animation-delay: ${props => props.delay || 0}s;
`;

const Nickname = styled.span`
  font-weight: 800;
  font-size: 18px;
`;

const MessageText = styled.span`
  word-break: break-word;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;
