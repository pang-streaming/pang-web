import React from "react";
import styled from "styled-components";
import {
  MarketCategoryElem,
  MarketCategoryElemProps,
} from "./components/market-category-elem";
import { marketCategoryIcons } from "@/app/assets/market/_index";

export const MarketCategorySection = () => {
  const categoryList: MarketCategoryElemProps[] = [
    { image: marketCategoryIcons.cube, title: "3D 모델" },
    { image: marketCategoryIcons.audio, title: "오디오 굿즈" },
    { image: marketCategoryIcons.goods, title: "굿즈" },
    { image: marketCategoryIcons.music, title: "음악" },
    { image: marketCategoryIcons.illustration, title: "일러스트" },
    { image: marketCategoryIcons.more, title: "기타" },
  ];

  return (
    <Container>
      {categoryList.map((c) => (
        <MarketCategoryElem image={c.image} title={c.title} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 18px;
  display: flex;
  align-items: center;
`;
