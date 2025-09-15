import React from "react";
import styled from "styled-components";
import { CardElem } from "./ui/card-elem";
import kbank from "@/app/assets/payment/kbank.svg";
import kakaobank from "@/app/assets/payment/kakaobank.svg";
import tossbank from "@/app/assets/payment/tossbank.svg";
import sinhanbank from "@/app/assets/payment/sinhanbank.svg";
export const CardListSection = () => {
  return (
    <Container>
      <Title>카드 목록</Title>
      <CardListContainer>
        <CardElem image={kbank} cardName="케이뱅크 체크" />
        <CardElem image={kakaobank} cardName="카카오뱅크 체크" />
        <CardElem image={tossbank} cardName="신한 SOL 체크" />
        <CardElem image={sinhanbank} cardName="토스카드" />
      </CardListContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 18px 15px 12px 15px;
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  width: 100%;
  margin-bottom: 5px;
`;
const CardListContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.normal};
  align-items: flex-start;
`;
