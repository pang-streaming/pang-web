import React from "react";
import CategoryBox from "./ui/category-box";
import { TabTitleText } from "@/shared/ui/tab-title-text";

export const Category = () => {
  return (
    <div>
      <TabTitleText text="카테고리" />
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
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
      </div>
    </div>
  );
};
