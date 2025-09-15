import styled from "styled-components";

export const CategoryBoxThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 205 / 280;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  margin-bottom: 10px;
`;

export const CategoryContainer = styled.div`
  aspect-ratio: 41/67;
  border-radius: ${({ theme }) => theme.borders.xlarge};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 3px solid transparent;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    cursor: pointer;
  }
`;

export const CategoryInfo = styled.div`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CategoryChip = styled.div`
  margin: 10px;
  width: 59px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.secondary.normal};
  border-radius: ${({ theme }) => theme.borders.small};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChipCountText = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.common.white};
`;
export const CategoryBoxTitle = styled.span`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;
export const LiveCountText = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
