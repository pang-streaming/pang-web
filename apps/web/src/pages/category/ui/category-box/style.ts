import styled from "styled-components";

export const CategoryContainer = styled.div`
  aspect-ratio: 41/67;
  border-radius: ${({ theme }) => theme.borders.xlarge};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 3px solid transparent;
  transition: 0.3s scale;
  &:hover {
    scale: 0.97;
  }
`;

export const CategoryInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const CategoryBoxThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 41 / 56;
  border-radius: ${({ theme }) => theme.borders.xlarge};
  overflow: hidden;
  border: 3px solid transparent;
  margin-bottom: 10px;
  transition: 0.3s border-color;
  &:hover {
    
    border-color: ${({ theme }) => theme.colors.primary.normal};
    cursor: pointer;
  }
`;

export const CategoryBoxThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const CategoryChip = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
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
