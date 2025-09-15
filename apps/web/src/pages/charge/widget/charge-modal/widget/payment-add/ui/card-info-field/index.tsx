import styled from "styled-components";

interface Props {
  type: "name" | "card-num" | "expiry-date" | "card-pw" | "owner" | "phone-num" | "birth";
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

const typeLabels: Record<Props["type"], string> = {
  name: "이름",
  "card-num": "카드 번호",
  "expiry-date": "유효기간",
  "card-pw": "비밀번호 앞 2자리",
  owner: "소유자명",
  "phone-num": "전화번호",
  birth: "생년월일",
};

export const CardInfoField = ({ type, value, onChange }: Props) => {

  const renderFields = () => {
    if (type === "card-num") {
      const cardNumbers = Array.isArray(value) ? value : ["", "", "", ""];
      return (
        <Row>
          {cardNumbers.map((num, index) => (
            <Input
              key={index}
              value={num}
              maxLength={4}
              onChange={(e) => {
                const newNumbers = [...cardNumbers];
                newNumbers[index] = e.target.value;
                onChange(newNumbers);
              }}
            />
          ))}
        </Row>
      );
    }
    if (type === "expiry-date") {
      const expiryData = Array.isArray(value) ? value : ["", ""];
      return (
        <Row>
          <Input
            placeholder="MM"
            maxLength={2}
            value={expiryData[0]}
            onChange={(e) => {
              const newExpiry = [...expiryData];
              newExpiry[0] = e.target.value;
              onChange(newExpiry);
            }}
          />
          <Input
            placeholder="YY"
            maxLength={2}
            value={expiryData[1]}
            onChange={(e) => {
              const newExpiry = [...expiryData];
              newExpiry[1] = e.target.value;
              onChange(newExpiry);
            }}
          />
        </Row>
      );
    }
    return (
      <Input
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        maxLength={type === "card-pw" ? 2 : type === "birth" ? 6 : undefined}
        placeholder={type === "birth" ? "YYMMDD" : undefined}
      />
    );
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
