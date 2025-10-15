import styled from "styled-components";
import { popularModelStoreList } from "./components/_dummy";
import { PopularModelStoreElem } from "./components/popular-model-store-elem";

export const PopularModelStore = () => {
  return (
    <Container>
      <Row>
        {popularModelStoreList.map((p) => (
          <PopularModelStoreElem
            profileImage={p.profileImage}
            bgImage={p.bgImage}
            storeName={p.storeName}
            description={p.description}
          />
        ))}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-radius: 12px;
  gap: 33px;
`;

const Row = styled.div`
  padding: 0 28px;
  gap: 27px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 12px;
`;
