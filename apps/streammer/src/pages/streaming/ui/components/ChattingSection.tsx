import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useChat } from '../../hooks/useChat';
import { ChatInput } from './ChatInput';

interface ChattingSectionProps {
  streamId?: string;
}

export const ChattingSection: React.FC<ChattingSectionProps> = ({ 
  streamId = "default-stream"
}) => {
  const { chatList, sendMessage } = useChat(streamId);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  return (
    <Container>
      <ChattingHeader>
        <ChattingArrow />
        <span>채팅</span>
      </ChattingHeader>

      <ChatMessages>
        {chatList.map((item, index) => (
          <MessageRow key={index}>
            <Nickname style={{ color: item.color }}>
              {item.viewerName ?? "익명"}
            </Nickname>
            <Message>{item.chatting}</Message>
          </MessageRow>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <ChatInput
        onSend={(message: string) => {
          sendMessage(message);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 435px;
  margin: 20px;
  height: 700px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

const ChatMessages = styled.div`
  margin-top: 50px;
  flex: 1; 
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChattingHeader = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

const ChattingArrow = styled.div`
  position: absolute;
  left: 10px;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const Nickname = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

const Message = styled.div`
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  align-self: flex-start;
  word-break: break-word;
`;

export default ChattingSection;
