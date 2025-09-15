import styled from "styled-components";
import { CardInfoField } from "../../ui/card-info-field";

export const CardInfoSection = () => {
  return (
    <Container>
      <CardInfoField type="name" />
      <CardInfoField type="card-num" />

      <Row>
        <CardInfoField type="expiry-date" />
        <CardInfoField type="card-pw" />
      </Row>

      <Row>
        <CardInfoField type="owner" />
        <CardInfoField type="phone-num" />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 18px 15px;
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;
