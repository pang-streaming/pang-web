import { Category } from '../../model/category';
import * as S from './style';

interface CategoryBoxProps {
  category: Category;
}

export const CategoryBox = ({ category }: CategoryBoxProps) => {

  const formattedChipCount = new Intl.NumberFormat().format(category.streamCount);

  return (
    <S.CategoryContainer>
      <S.CategoryBoxThumbnail backgroundImage={category.postImage}>
        <S.CategoryChip>
          <S.ChipCountText>•{formattedChipCount}</S.ChipCountText>
        </S.CategoryChip>
      </S.CategoryBoxThumbnail>

      <S.CategoryInfo>
        <S.CategoryBoxTitle>{category.name}</S.CategoryBoxTitle>
        <S.LiveCountText>라이브 {category.streamCount}개</S.LiveCountText>
      </S.CategoryInfo>
    </S.CategoryContainer>
  );
};