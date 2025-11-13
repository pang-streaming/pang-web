import { IChatMessageResponse } from "@/entities/chat/IChatMessageResponse";
import { useSocket } from "@/pages/streaming/hooks/useSocketHook";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import styled, { keyframes } from "styled-components";

interface IChatProps {
  roomId: string;
}

export const Chat = ({ roomId }: IChatProps) => {
  const [messages, setMessages] = useState<IChatMessageResponse[]>([]);
  const [message, setMessage] = useState<string>("");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const randomColor = useCallback((): string => {
    let color = "";
    do {
      color = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    } while (color === "#000000" || color === "#ffffff");
    return color;
  }, []);

  const handleChat = useCallback((data: IChatMessageResponse) => {
    data.color = randomColor();
    setMessages((prev) => [...prev, data]);
  }, [randomColor]);

  const { sendMessage } = useSocket({
    roomId,
    onChat: handleChat,
  });

  const handleSendMessage = () => {
    if (message.trim().length === 0) return;
    sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <PageWrapper>
      <ChatContainer ref={chatContainerRef}>
        {messages.map((m, index) => (
          <MessageBubble key={m.id} delay={index * 0.02}>
            <Nickname style={{ color: m.color }}>{m.nickname}</Nickname>{" "}
            <MessageText>{m.message}</MessageText>
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </ChatContainer>
      <ChatInputContainer>
        <ChatInputWrapper>
          <ChatInput
            type="text"
            placeholder="메시지를 입력하세요..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <SendButton 
            onClick={handleSendMessage}
            disabled={message.trim().length === 0}
            $hasMessage={message.trim().length > 0}
          >
            <SendIcon><FaPaperPlane size={18} /></SendIcon>
          </SendButton>
        </ChatInputWrapper>
      </ChatInputContainer>
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
  overflow: hidden;
  height: 100%;
  min-height: 0;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  max-height: 100%;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
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

const ChatInputContainer = styled.div`
  
`;

const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 10px;
  padding: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
  }
`;

const ChatInput = styled.input`
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 16px;
  font-weight: 500;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
    font-weight: 400;
  }

  &:focus {
    &::placeholder {
      opacity: 0.7;
    }
  }
`;

const SendButton = styled.button<{ $hasMessage: boolean }>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ $hasMessage, theme }) => 
    $hasMessage ? theme.colors.common.white : theme.colors.text.subtitle
  };
  cursor: ${({ $hasMessage }) => $hasMessage ? 'pointer' : 'not-allowed'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: ${({ $hasMessage }) => $hasMessage ? 'scale(1)' : 'scale(0.95)'};
  opacity: ${({ $hasMessage }) => $hasMessage ? '1' : '0.6'};

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const SendIcon = styled.span`
  font-size: 16px;
  transition: transform 0.2s ease;
  
  ${SendButton}:hover:not(:disabled) & {
    transform: translateX(1px);
  }
`;