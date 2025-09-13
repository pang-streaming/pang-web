import styled from "styled-components";

interface DividerProps {
  color: string;
  verticalPadding?: number;
}

export const Divider = ({ color, verticalPadding = 0 }: DividerProps) => {
  return <Wrapper color={color} verticalPadding={verticalPadding} />;
};

const Wrapper = styled.div<{ color: string; verticalPadding: number }>`
  margin: ${({ verticalPadding }) => verticalPadding}px 0;
  width: 100%;
  height: 1px;
  background-color: ${({ color }) => color};
`;
