import { useEffect, useState } from "react";
import styled from "styled-components";
import { MainNoticeElem } from "./components/main-notice-elem";
import { useTopFiveProduct } from "../../hooks/useProduct";
import { SkeletonBox, SkeletonGrid } from "@/shared/ui/skeleton";

export const MainNoticeSlide = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const { data: topFiveProducts, isLoading, error } = useTopFiveProduct();

  const productList = Array.isArray(topFiveProducts) ? topFiveProducts : [];
  const originalLength = productList.length;
  
  console.log("topFiveProducts:", topFiveProducts);
  console.log("productList:", productList);

  useEffect(() => {
    if (originalLength === 0) return;
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % originalLength);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [originalLength]);

  if (isLoading) {
    return (
      <SlideContainer>
        <SkeletonBox width={445} height={264}/>
      </SlideContainer>
    );
  }

  if (error || originalLength === 0) {
    return (
      <SlideContainer>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          상품이 없습니다
        </div>
      </SlideContainer>
    );
  }

  return (
    <SlideContainer>
      <SlideTrack $index={index} $isTransitioning={isTransitioning}>
        {productList.map((item, i) => (
          <SlideItem key={item.id || i}>
            <MainNoticeElem {...item} />
          </SlideItem>
        ))}
      </SlideTrack>
    </SlideContainer>
  );
};

const SlideContainer = styled.div`
  width: 100%;
  height: 264px;
  overflow: hidden;
  
  position: relative;
  cursor: pointer;
`;

const SlideTrack = styled.div<{ $index: number; $isTransitioning: boolean }>`
  display: flex;
  transition: ${({ $isTransitioning }) =>
    $isTransitioning ? "transform 0.6s ease" : "none"};
  transform: translateX(${({ $index }) => `-${$index * 470}px`});
`;

const SlideItem = styled.div`
  flex: 0 0 470px;
`;
