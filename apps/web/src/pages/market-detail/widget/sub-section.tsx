import styled from "styled-components";
import { HeartBox } from "../ui/heart-box";
import {GoKebabHorizontal} from "react-icons/go";
import {IconButton} from "@pang/shared/ui";
import {IoShareSocialOutline} from "react-icons/io5";

export const SubSection = () => {
  return (
    <Container>
      <HeartBox />
      <RightIcons>
	      <IconButton Icon={IoShareSocialOutline} onClick={() => console.log("공유")}/>
	      <IconButton Icon={GoKebabHorizontal} onClick={() => console.log("더보기 신고하기")}/>
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