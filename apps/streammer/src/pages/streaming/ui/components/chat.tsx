import { IChatMessageResponse } from "@/entities/chat/IChatMessageResponse";
import { useSocket } from "@/pages/streaming/hooks/useSocketHook";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

interface IChatProps{
    roomId: string
}

export const Chat = ({roomId}:IChatProps) => {
    
    const [messages, setMessages] = useState<IChatMessageResponse[]>([]);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const randomColor = (): string => {
        let color = "";
        do {
            color = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
        } while (color === "#000000" || color === "#ffffff");
        return color;
    }

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


    useSocket({
        roomId,
        onChat: (data) => handleChat(data),
    });

    return (<>
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
    </>)
    
}


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
