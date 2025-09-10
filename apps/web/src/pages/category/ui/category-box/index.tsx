



import * as S from './style'


export interface CategoryBoxProps {
  categoryChipCount: number;
  categoryTitle: string;
  categoryLiveCount: number;
  categoryThumbnail?: string;
}

const CategoryBox = ({
  categoryChipCount,
  categoryLiveCount,
  categoryTitle,
}: CategoryBoxProps) => {

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
