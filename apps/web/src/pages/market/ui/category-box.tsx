import styled from "styled-components";
import {ElementType} from "react";

interface CategoryProps {
  text: string;
  Icon?: ElementType;
}

export const CategoryBox = ({ text, Icon }: CategoryProps) => {
  return (
    <CategoryBoxContainer>
      <Text>{text}</Text>
        {Icon && (
          <Icon/>
        )}
    </CategoryBoxContainer>
  );
};

const CategoryBoxContainer = styled.div`
	padding: 16px 40px;
  background-color: ${({theme}) => (theme.colors.content.normal)};
	color: ${({theme}) => theme.colors.text.normal};
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
  justify-content: center;
	text-align: center;
  align-items: center;
  border-radius: 12px;
  gap: 8px;
  cursor: pointer;
	user-select: none;

  &:hover {
    background-color: ${({theme}) => theme.colors.hover.light};
  }
`;

const Text = styled.span`
  font-size: ${({theme}) => theme.font.large};
  font-weight: 700;
`;