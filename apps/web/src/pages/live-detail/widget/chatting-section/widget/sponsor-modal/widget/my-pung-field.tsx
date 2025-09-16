

import React from 'react'
import styled from 'styled-components';

interface MyPungFieldProps {
  userCash: number;
}



export const MyPungField = ({ userCash }: MyPungFieldProps) => {
  console.log("MyPungField 렌더링, userCash:", userCash);
  return (
    <Container>
      <Text>보유중인 펑</Text>
      <Amount>{`${userCash.toLocaleString()}개`}</Amount>
    </Container>
  );
};



const Container = styled.div`
  padding: 20px 16px 16px 16px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: ${({ theme }) => theme.borders.large};
  background-color: transparent;
  border: 1px solid #262626;
`;

const Text = styled.span`
  font-size: ${({theme}) => theme.font.large};
  font-weight: 600;
  color: ${({theme}) => theme.colors.text.subtitle};
`;

const Amount = styled.span`
  font-size: ${({theme}) => theme.font.large};
  font-weight: 900;
  color: ${({theme}) => theme.colors.primary.normal};
`;