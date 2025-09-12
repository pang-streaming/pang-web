import styled from "styled-components";
import charge from "@/app/assets/images/charge.svg";
import { ChargeButton } from "../../ui/charge-button";
interface ChargeBoxProps {
  type: "mypung" | "chargepung";
}

export const ChargeBox = ({ type }: ChargeBoxProps) => {
  return (
    <Container>
      {type === "mypung" ? (
        <StrokeCircle>
          <span style={{ fontSize: 32 }}>💣</span>
        </StrokeCircle>
      ) : (
        <img src={charge} style={{ marginRight: 20 }} />
      )}
      <Text>{type === "mypung" ? "보유중인 펑 : 300개" : "펑 자동충전"}</Text>
      <ChargeButton />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  height: 80px;
  border-radius: 8px;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;
const StrokeCircle = styled.div`
  width: 75px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const Text = styled.span`
  margin-right: auto;
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
`;
