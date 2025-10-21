import styled from "styled-components";
import { membershipList } from "./components/_dummy";
import { MembershipElem } from "./components/membership-elem";

export const MembershipSection = () => {
  return (
    <Container>
      <Row>
        {membershipList.map((v) => (
            <MembershipElem company={v.company} image={v.image} productName={v.productName} price={v.price}/>
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
  background-color:${({theme}) => theme.colors.content.normal} ;
  border-radius: 12px;
`;
