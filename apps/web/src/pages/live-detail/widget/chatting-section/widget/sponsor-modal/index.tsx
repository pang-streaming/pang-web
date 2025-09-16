import styled from "styled-components";
import * as W from './widget/index';
import { SubmitButton } from "@pang/shared/ui";

interface SponsorModalProps {
  pungAmount: number;
  onPungChange: (amount: number) => void;
  sponsorPung: () => void;
  userCash: number;
}

export const SponsorModal = ({ pungAmount, onPungChange, sponsorPung, userCash }: SponsorModalProps) => {
  const isInsufficient = pungAmount > userCash;

  return (
    <Container>
        <W.MyPungField userCash={userCash}/>
      <W.IncreaseField pungAmount={pungAmount} onPungChange={onPungChange} />
      <W.AgreeRow />
      {isInsufficient && (
        <InsufficientWarning>
          ⚠️ 보유 펑이 부족합니다 (보유: {userCash.toLocaleString()}개)
        </InsufficientWarning>
      )}
      <SubmitButton 
        onClick={sponsorPung}
        disabled={isInsufficient}
      >
        펑 후원하기
      </SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  user-select: none;
`;

const InsufficientWarning = styled.div`
  background-color: #ffebee;
  border: 1px solid #f44336;
  border-radius: 8px;
  padding: 12px;
  color: #d32f2f;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;
