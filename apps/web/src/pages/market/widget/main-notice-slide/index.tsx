import { useEffect, useState } from "react";
import styled from "styled-components";
import { mainNoticeList } from "./_dummy";
import { MainNoticeElem } from "./components/main-notice-elem";

export const MainNoticeSlide = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mainNoticeList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SlideContainer>
      <SlideTrack $index={index}>
        {mainNoticeList.map((item, i) => (
          <SlideItem key={i}>
            <MainNoticeElem
              bgImage={item.bgImage}
              title={item.title}
              subTitle={item.subTitle}
            />
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

const SlideTrack = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.6s ease;
  transform: translateX(${({ $index }) => `-${$index * 470}px`});
`;

const SlideItem = styled.div`
  flex: 0 0 470px;
`;
