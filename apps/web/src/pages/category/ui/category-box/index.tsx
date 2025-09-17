import * as S from './style'
import {useNavigate} from "react-router-dom";

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
    categoryThumbnail
}: CategoryBoxProps) => {
    const formattedChipCount = new Intl.NumberFormat().format(categoryChipCount);
		const navigate = useNavigate();
		
	return (
		<S.CategoryContainer onClick={() => navigate("/category-detail")}>
			<S.CategoryBoxThumbnail backgroundImage={categoryThumbnail}>
				<S.CategoryChip><S.ChipCountText>•{formattedChipCount}</S.ChipCountText></S.CategoryChip>
			</S.CategoryBoxThumbnail>
			<S.CategoryInfo>
				<S.CategoryBoxTitle>{categoryTitle}</S.CategoryBoxTitle>
				<S.LiveCountText>라이브 {categoryLiveCount}개</S.LiveCountText>
			</S.CategoryInfo>
		</S.CategoryContainer>
	);
};