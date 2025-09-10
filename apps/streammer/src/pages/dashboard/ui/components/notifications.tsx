import React from 'react';
import styled from 'styled-components';

export interface NotificationItem {
  id: string;
  title: string;
  date: string;
}

interface NotificationsProps {
  notifications: NotificationItem[];
}

export const Notifications: React.FC<NotificationsProps> = (props: NotificationsProps) => {
  return (
    <NotificationContainer>
      <SectionHeader>
        <NotificationIcon />
        <SectionTitle>공지사항</SectionTitle>
      </SectionHeader>
      <NotificationsList>
        {props.notifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationDate>{notification.date}</NotificationDate>
          </NotificationItem>
        ))}
      </NotificationsList>
    </NotificationContainer>
  );
};

const NotificationIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  background-image: url('/notifications.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 24px;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.large};
`;

const NotificationTitle = styled.p`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
  line-height: 1.5;
`;

const NotificationDate = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
