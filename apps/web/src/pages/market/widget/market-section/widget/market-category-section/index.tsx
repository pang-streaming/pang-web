import React from "react";
import styled from "styled-components";
import { MarketCategoryElem, MarketCategoryElemProps } from "./components/market-category-elem";
import { marketCategoryIcons } from "@/app/assets/market/_index";
import { useNavigate } from "react-router-dom"; // react-router-dom 필요
import { useCategoryByProduct } from "@/pages/market/hooks/useProduct";

export const MarketCategorySection = () => {
  const navigate = useNavigate();

  const categoryList: MarketCategoryElemProps[] = [
    { query: "VIRTUAL_MODEL",image: marketCategoryIcons.cube, title: "3D 모델" },
    { query: "AUDIO_GOODS",image: marketCategoryIcons.audio, title: "오디오 굿즈" },
    { query: "GOODS",image: marketCategoryIcons.goods, title: "굿즈" },
    { query: "MUSIC",image: marketCategoryIcons.music, title: "음악" },
    { query: "ILLUSTRATION",image: marketCategoryIcons.illustration, title: "일러스트" },
    { query: "ETC",image: marketCategoryIcons.more, title: "기타" },
  ];



  const handleCategoryClick = (category: string) => {
    navigate(`/market-category-detail/${category}`);
  };

  return (
    <Container>
      {categoryList.map((c) => (
        <MarketCategoryElem
        query={c.query}
          key={c.title}
          image={c.image}
          title={c.title}
          onClick={() => handleCategoryClick(c.title)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 18px;
  display: flex;
  align-items: center;
`;
