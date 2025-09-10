

import styled from "styled-components";

export const CategoryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 38px 0px;
`;

export const CategoryTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 19px;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
  row-gap: 30px;
`;
export const CatgoryBoxContainer = styled.div`
  width: 205px;
  height: 335px;
  border-radius: 10px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

export const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CategoryBoxThumbnail = styled.div`
  width: 100%;
  height: 280px;
  background-color: #27272a;
  border-radius: 10px;
  margin-bottom: 10px;
`;
export const Spacer = styled.div`
  flex: 1;
`;

export const CategoryChip = styled.div`
  margin: 10px;
  width: 59px;
  height: 20px;
  background-color: ${({theme}) => theme.colors.secondary.normal};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChipCountText = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text.normal};
`;
export const CategoryBoxTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;
export const LiveCountText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #a3a3a3;
`;
