import share from "@/app/assets/share.svg";
import more from "@/app/assets/more.svg";
import styled from "styled-components";
import { HeartBox } from "../ui/heart-box";

export const SubSection = () => {
  return (
    <Container>
      <HeartBox />
      <RightIcons>
        <Icon src={share}/>
        <Icon src={more} />
      </RightIcons>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RightIcons = styled.div`
  gap: 25px;
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
