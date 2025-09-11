import styled from "styled-components";

export const StepIndicator = styled.div`
  position: absolute;
  bottom: 20vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const StepCircle = styled.div<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isActive,theme }) => ($isActive ? "#F37" :theme.colors.button.disabled)};
  transition: background-color 0.3s;
`;