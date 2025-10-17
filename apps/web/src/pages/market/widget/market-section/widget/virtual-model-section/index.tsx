import styled from "styled-components";
import { VirtualModelElem } from "./components/virtual-model-elem";
import { virtualModelList } from "./_dummy";

export const VirtualModelSection = () => {
  return (
    <Container>
      <Row>
        {virtualModelList.map((v) => (
            <VirtualModelElem image={v.image} productName={v.productName} price={v.price}/>
        ))}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: 33px;
`;

const Row = styled.div`
  padding: 18px;
  gap: 27px;
  display: flex;
  flex-wrap: wrap;
  background-color: ${({theme}) => theme.colors.content.normal};
  border-radius: 12px;
`;
