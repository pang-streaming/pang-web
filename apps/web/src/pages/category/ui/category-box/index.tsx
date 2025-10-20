import { Category } from "../../model/category";
import * as S from "./style";
import nullThumbnail from "@/app/assets/banner2.png";
import { useState } from "react";

interface CategoryBoxProps {
  category: Category;
}

export const CategoryBox = ({ category }: CategoryBoxProps) => {
  const [imageSrc, setImageSrc] = useState<string>(
    category.postImage && category.postImage.trim() !== ""
      ? category.postImage
      : nullThumbnail
  );

  const handleImageError = () => {
    setImageSrc(nullThumbnail);
  };

  return (
    <S.CategoryContainer>
      <S.CategoryBoxThumbnailWrapper>
        <S.CategoryBoxThumbnail
          src={imageSrc}
          onError={handleImageError}
          alt={category.name}
        />
      </S.CategoryBoxThumbnailWrapper>
      <S.CategoryInfo>
        <S.CategoryBoxTitle>{category.name}</S.CategoryBoxTitle>
        <S.LiveCountText>라이브 {category.streamCount}개</S.LiveCountText>
      </S.CategoryInfo>
    </S.CategoryContainer>
  );
};


