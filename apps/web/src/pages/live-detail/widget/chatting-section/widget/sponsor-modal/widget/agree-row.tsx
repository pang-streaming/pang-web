import React from "react";
import styled from "styled-components";

export const AgreeRow = () => {
  return (
    <Row>
      <LeftText>내용을 확인했으며 펑 충전에 동의합니다.</LeftText>
      <RightText>안내보기</RightText>
    </Row>
  );
};

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftText = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
const RightText = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-decoration: underline;
`;
