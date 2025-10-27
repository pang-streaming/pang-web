import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { MainNoticeElem } from "./components/main-notice-elem";
import { SkeletonBox } from "@/shared/ui/skeleton";
import { EmptyMessage } from "../../page/store-detail/style";
import { useTopFiveProduct } from "@/features/market/hooks/useProduct";

export const MainNoticeSlide = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const { data: topFiveProducts, isLoading, error } = useTopFiveProduct();
  const productList = Array.isArray(topFiveProducts) ? topFiveProducts : [];
  const originalLength = productList.length;

  const extendedList = [...productList, ...productList]; 

  useEffect(() => {
    if (originalLength === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 5000);

    return () => clearInterval(timer);
  }, [originalLength]);

  const handleTransitionEnd = () => {
    if (index >= originalLength) {
      setIsTransitioning(false);
      setIndex(0);
    }
  };

  if (isLoading) {
    return (
      <div style={{display:'flex', gap: 20}}>
        <SkeletonBox width={445} height={264}/>
        <SkeletonBox width={445} height={264}/>
        <SkeletonBox width={445} height={264}/>
      </div>
    );
  }

  if (error || originalLength === 0) {
    return (
      <SlideContainer>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',color: 'white' }}>
          <EmptyMessage>상품이 없습니다</EmptyMessage>
        </div>
      </SlideContainer>
    );
  }

  return (
    <SlideContainer>
      <SlideTrack
        ref={trackRef}
        $index={index}
        $isTransitioning={isTransitioning}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedList.map((item, i) => (
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
