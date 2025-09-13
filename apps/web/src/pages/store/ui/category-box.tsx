


import styled from "styled-components";
import { RiMoreFill } from "react-icons/ri";

interface CategoryProps {
  text: string;
  icon?: string;
}

export const CategoryBox = ({ text, icon }: CategoryProps) => {
  return (
    <Container>
      <Text>{text}</Text>
      <IconWrapper>
        {icon ? (
          <img src={icon} alt={text} />
        ) : (
          <MobileIcon>
            <RiMoreFill color="white" />
          </MobileIcon>
        )}
      </IconWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 255px;
  height: 57px;
  background-color: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: #353535;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const Text = styled.span`
  font-size: 18px;
  line-height: 1; 
  font-weight: 600;
  color: #d9d9d9;
  margin-top: 3px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MobileIcon = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: block;
  }
`;
