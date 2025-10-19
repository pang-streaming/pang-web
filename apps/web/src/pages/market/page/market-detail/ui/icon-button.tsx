import styled from "styled-components";
import Buy from "@/app/assets/shopping-cart.svg";
import Gift from "@/app/assets/gift.svg";
interface IconButtonProps {
  type: "buy" | "gift";
}

export const IconButton = ({ type }: IconButtonProps) => {
  return (
    <Container type={type}>
      <img src={type == "buy" ? Buy : Gift} alt="" />
      <Text>{type == "buy" ? "상품 구매하기" : "기프트 보내기"}</Text>
    </Container>
  );
};

const Text = styled.span`
  font-size: 15px;
  font-weight: 400;
`;

const Container = styled.div<{ type: "buy" | "gift" }>`
  height: 48px;
  border-radius: 4px;
  padding: 0 16px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;

  background-color: ${({ type }) => (type === "buy" ? "#FF0055" : "")};
  color: ${({ type }) => (type === "buy" ? "#fff" : "#FF0055")};
  border: ${({ type }) => (type === "buy" ? "none" : "2px solid #ff0055;")};
`;
