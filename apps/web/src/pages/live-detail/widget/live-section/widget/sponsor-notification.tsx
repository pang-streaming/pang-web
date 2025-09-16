import { getSponsorColor } from "@/shared/lib/sponsor-color";
import styled, { keyframes } from "styled-components";


interface SponsorNotificationProps {
  nickname: string;
  amount: number;
  isVisible: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

export const SponsorNotification = ({ nickname, amount, isVisible }: SponsorNotificationProps) => {
  if (!isVisible) return null;

  const sponsorColor = getSponsorColor(amount);

  return (
    <Container>
      <NotificationBox 
        style={{
          background: sponsorColor.background,
          boxShadow: `0 4px 20px ${sponsorColor.shadowColor}`
        }}
      >
        <Icon>💣</Icon>
        <Text>
          <Nickname>{nickname}</Nickname> 님이 <Amount>{amount.toLocaleString()}</Amount>개를 후원하셨습니다.
        </Text>
      </NotificationBox>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const NotificationBox = styled.div`
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Icon = styled.div`
  font-size: 24px;
  animation: bounce 1s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Text = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
`;

const Nickname = styled.span`
  color: #fff;
  font-weight: 700;
`;

const Amount = styled.span`
  color: #ffeb3b;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
`;
