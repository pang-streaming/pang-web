import { ChargeButton } from "@/pages/charge/ui/charge-button";
import styled from "styled-components";

interface AddCardSectionProps {
  toPaymentAdd: () => void;
}

export const AddCardSection = ({ toPaymentAdd }: AddCardSectionProps) => {
  return (
    <Container>
      <GradientCircle size={46}>
        <div className="inner">
          <span style={{ fontSize: 24 }}>💣</span>
        </div>
      </GradientCircle>
      <Text>카드가 목록에 없나요?</Text>
      <ChargeButton onClick={toPaymentAdd}>카드 추가</ChargeButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-right: auto;
`;

export const GradientCircle = styled.div<{ size?: number; innerBg?: string }>`
  width: ${({ size = 60 }) => `${size}px`};
  height: ${({ size = 60 }) => `${size}px`};
  padding: 1px;
  border-radius: ${({theme}) =>theme.borders.maximum};
  background: linear-gradient(to bottom, ${({theme}) => theme.colors.primary.normal}, ${({theme}) => theme.colors.secondary.normal});
  display: flex;
  align-items: center;
  margin-right: 10px;
  justify-content: center;
  box-sizing: border-box;

  & > .inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.background.normal};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;