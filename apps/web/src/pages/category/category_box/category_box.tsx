import * as S from "./category.style";
import { CategoryChipProps } from "./category.props";

const CategoryBox = ({
  categoryChipCount,
  categoryLiveCount,
  categoryTitle,
}: CategoryChipProps) => {

  const formattedChipCount = new Intl.NumberFormat().format(categoryChipCount);


  return (
    <>
      <S.CatgoryBoxContainer>
        <S.CategoryBoxThumbnail>
          <S.CategoryChip><S.ChipCountText>{formattedChipCount}</S.ChipCountText></S.CategoryChip>
        </S.CategoryBoxThumbnail>
        <S.CategoryInfo>
          <S.CategoryBoxTitle>{categoryTitle}</S.CategoryBoxTitle>
          <S.LiveCountText>라이브 {categoryLiveCount}개</S.LiveCountText>
        </S.CategoryInfo>
      </S.CatgoryBoxContainer>
    </>
  );
};

export default CategoryBox;
