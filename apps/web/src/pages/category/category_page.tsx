import React from "react";
import {
  CategoryContainer,
  CategoryGrid,
  CategoryTitle,
} from "./category_box/category.style";
import CategoryBox from "./category_box/category_box";

const CategoryPage = () => {
  return (
    <>
      <CategoryContainer>
        <CategoryTitle>카테고리</CategoryTitle>
        <CategoryGrid>
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="게임"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="음악"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="스포츠"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="일상"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="ASMR"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="버추얼"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="게임"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="음악"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="스포츠"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="일상"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="ASMR"
          />
          <CategoryBox
            categoryChipCount={126315}
            categoryLiveCount={201}
            categoryTitle="버추얼"
          />
        </CategoryGrid>
      </CategoryContainer>
    </>
  );
};

export default CategoryPage;
