import styled from "styled-components";


interface ChargeButtonProps {
  children: string;
  onClick: () => void;
}

export const ChargeButton = ({children,onClick}:ChargeButtonProps) => {
  return (
    <Container onClick={onClick}>
      <Text>{children}</Text>
    </Container>
  );
};

const Container = styled.button`
  width: 84px;
  outline: none;
  height: 46px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary.normal};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;

`;

const Text = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary.normal};
  font-size: ${({ theme }) => theme.font.large};
`;