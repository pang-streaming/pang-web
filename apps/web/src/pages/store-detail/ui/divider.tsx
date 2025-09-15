import styled from "styled-components";

interface DividerProps {
  verticalPadding?: number;
}

export const Divider = ({  verticalPadding = 0 }: DividerProps) => {
  return <Wrapper verticalPadding={verticalPadding} />;
};

const Wrapper = styled.div<{ verticalPadding: number }>`
  margin: ${({ verticalPadding }) => verticalPadding}px 0;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.button.disabled};
`;
