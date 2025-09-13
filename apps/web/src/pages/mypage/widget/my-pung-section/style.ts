import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 60px;
  padding: 0 20px;
  height: 72px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  display: flex;
  align-items: center;
`;

export const GradientCircle = styled.div<{ size?: number; innerBg?: string }>`
  width: ${({ size = 60 }) => `${size}px`};
  height: ${({ size = 60 }) => `${size}px`};
  padding: 1px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #ff0055, #6600ff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  & > .inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.background.normal};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};

  margin-left: 20px;
  margin-right: auto;
`;

export const HighLight = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.normal};
`;