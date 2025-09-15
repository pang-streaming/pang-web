import styled from "styled-components";

interface Props {
  type: "name" | "card-num" | "expiry-date" | "card-pw" | "owner" | "phone-num";
}

const typeLabels: Record<Props["type"], string> = {
  name: "이름",
  "card-num": "카드 번호",
  "expiry-date": "유효기간",
  "card-pw": "비밀번호 앞 2자리",
  owner: "소유자명",
  "phone-num": "전화번호",
};

export const CardInfoField = ({ type }: Props) => {
  const renderFields = () => {
    if (type === "card-num") {
      return (
        <Row>
          <Input />
          <Input />
          <Input />
          <Input />
        </Row>
      );
    }
    if (type === "expiry-date") {
      return (
        <Row>
          <Input />
          <Input />
        </Row>
      );
    }
    return <Input />;
  };

  return (
    <Wrapper>
      <Title>{typeLabels[type]}</Title>
      {renderFields()}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Row = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;

  input {
    flex: 1;
  }
`;


const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  color: ${({theme}) =>theme.colors.text.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
  background-color: ${({ theme }) => theme.colors.background.normal};
  padding: 12px 16px;
  box-sizing: border-box;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
