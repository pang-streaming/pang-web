import * as S from './style'

interface CategoryBoxProps {
    categoryChipCount: number;
    categoryTitle: string;
    categoryLiveCount: number;
    categoryThumbnail?: string;
}

export const CategoryBox = ({
    categoryChipCount,
    categoryLiveCount,
    categoryTitle,
}: CategoryBoxProps) => {
    const formattedChipCount = new Intl.NumberFormat().format(categoryChipCount);

	return (
		<S.CategoryContainer>
			<S.CategoryBoxThumbnail>
				<S.CategoryChip><S.ChipCountText>•{formattedChipCount}</S.ChipCountText></S.CategoryChip>
			</S.CategoryBoxThumbnail>
			<S.CategoryInfo>
				<S.CategoryBoxTitle>{categoryTitle}</S.CategoryBoxTitle>
				<S.LiveCountText>라이브 {categoryLiveCount}개</S.LiveCountText>
			</S.CategoryInfo>
		</S.CategoryContainer>
	);
};