import { MdPadding } from "react-icons/md";
import { WiDayThunderstorm } from "react-icons/wi";
import styled from "styled-components";

export const CategoryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 38px 40px;
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
`
/// 위는 카테고리 페이지스타일

/// 스타일이거기준으로 분리하면됨 시간없어서 ㅃㅇ

/// 카테ㅐ고리 박스 스타일(분리안함쏘리ㅠㅠ)
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
  background-color: #6600ff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChipCountText = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #F0E5FF;
`;
export const CategoryBoxTitle = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
`;
export const LiveCountText = styled.span`
font-size: 12px;
font-weight: 500;
color: #A3A3A3;
`