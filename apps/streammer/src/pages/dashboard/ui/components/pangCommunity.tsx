import React from 'react';
import styled from 'styled-components';

interface MessageItem {
  id: string;
  content: string;
  date: string;
}

interface PangCommunityProps {
  messages: MessageItem[];
}

export const PangCommunity: React.FC<PangCommunityProps> = ({ messages }: PangCommunityProps) => {
  return (
    <MessagesContainer>
      <SectionHeader>
        <ProfileIcon />
        <SectionTitle>팡커뮤</SectionTitle>
      </SectionHeader>
      <MessagesList>
        {messages.map((message) => (
          <MessageItem key={message.id}>
            <MessageContent>{message.content}</MessageContent>
            <MessageDate>{message.date}</MessageDate>
          </MessageItem>
        ))}
      </MessagesList>
    </MessagesContainer>
  );
};

const ProfileIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  background-image: url('/pangCommunity.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 24px;
  height: 100%;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  flex: 1;
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

const MessageContent = styled.p`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
  line-height: 1.5;
`;

const MessageDate = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
