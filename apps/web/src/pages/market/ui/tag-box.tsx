import styled from "styled-components";

export const TagBox = ({ text }: { text: string }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.borders.large};
  background-color: ${({theme}) => theme.colors.content.normal};
  white-space: nowrap;
	color: ${({theme}) => theme.colors.text.normal};
	cursor: pointer;
  &:hover {
    background-color: ${({theme}) => theme.colors.hover.light};
  }
`;

const Text = styled.span`
  font-size: ${({theme}) => theme.font.large};
	font-weight: 700;
  user-select: none;
`;
