import { useState } from "react";
import styled from "styled-components";
import { SubmitButton } from "@pang/shared/ui";
import { IncreaseField } from "./pung-charge/widget";

interface AutoChargeProps {
  onClose?: () => void;
}

export const AutoCharge = ({ onClose }: AutoChargeProps) => {
  const [agreed, setAgreed] = useState(false);
  const [autoChargeAmount, setAutoChargeAmount] = useState(1000);
  const finalAutoChargeAmount = autoChargeAmount + (autoChargeAmount * 0.1);

  const handleAgree = () => {
    if (agreed) {
      alert(`펑 자동충전이 설정되었습니다. (자동충전 금액: ${finalAutoChargeAmount.toLocaleString()}펑)`);
      onClose?.();
    } else {
      alert("내용을 확인하고 동의해주세요.");
    }
  };

  return (
    <Container>
      <InfoBox>
        <InfoTitle>펑 자동충전 안내</InfoTitle>
        <InfoContent>
          <p>• 보유한 펑이 1000개 미만일 때 자동으로 충전됩니다.</p>
          <p>• 등록된 결제수단으로 자동 결제됩니다.</p>
          <p>• 자동충전은 언제든지 해지할 수 있습니다.</p>
        </InfoContent>
      </InfoBox>

      <Section>
        <SectionTitle>자동충전 금액 설정</SectionTitle>
        <IncreaseField pungAmount={autoChargeAmount} onPungChange={setAutoChargeAmount} />
      </Section>

      <AgreementSection>
        <CheckboxLabel>
          <Checkbox
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <AgreementText>내용을 확인했으며 펑 자동충전에 동의합니다</AgreementText>
        </CheckboxLabel>
      </AgreementSection>

      <ButtonContainer>
        <SubmitButton onClick={handleAgree} disabled={!agreed}>
          자동충전 설정
        </SubmitButton>
        <SubmitButton type="alternative" onClick={onClose}>
          취소
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;
`;

const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 20px;
`;

const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0 0 16px 0;
`;

const InfoContent = styled.div`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 1.6;

  p {
    margin: 8px 0;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const AgreementSection = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.large};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const AgreementText = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

