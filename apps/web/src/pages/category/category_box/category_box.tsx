import React from "react";
import { CategoryChipProps } from "./category.props";
import {
  CategoryBoxThumbnail,
  CategoryBoxTitle,
  CategoryChip,
  CategoryInfo,
  CatgoryBoxContainer,
  ChipCountText,
  LiveCountText,
} from "./category.style";

const CategoryBox = ({
  categoryChipCount,
  categoryLiveCount,
  categoryTitle,
  categoryThumbnail
}: CategoryChipProps) => {

  const formattedChipCount = new Intl.NumberFormat().format(categoryChipCount);


  return (
    <>
      <CatgoryBoxContainer>
        <CategoryBoxThumbnail>
          <CategoryChip><ChipCountText>{formattedChipCount}</ChipCountText></CategoryChip>
        </CategoryBoxThumbnail>
        <CategoryInfo>
          <CategoryBoxTitle>{categoryTitle}</CategoryBoxTitle>
          <LiveCountText>라이브 {categoryLiveCount}개</LiveCountText>
        </CategoryInfo>
      </CatgoryBoxContainer>
    </>
  );
};

export default CategoryBox;
