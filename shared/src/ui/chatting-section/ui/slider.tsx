// import styled from "styled-components";
// import { useSlider } from "@/entities/video/hooks/controller/useSlider";
// import { ChattingSection } from "..";

// interface SliderProps {
//   value: number;
//   onChange: (v: number) => void;
// }

// export const Slider = ({ value, onChange }: SliderProps) => {
//   const min = 0;
//   const max = 100;
//   const { sliderRef, handleMouseDown } = useSlider({onChange, min, max,});
//   const percentage = (value - min) / (max - min) * 100;

//   return (
//     <SliderContainer
//       ref={sliderRef}
//       onMouseDown={handleMouseDown}
//     >
//       <SliderTrack percentage={percentage} />
//       <ChattingSection streamId=""/>
//       <SliderThumb percentage={percentage} />
//     </SliderContainer>
//   );
// };

// const SliderContainer = styled.div`
//   position: relative;
//   width: 100px;
//   height: 6px;
//   background-color: ${({ theme }) => theme.colors.common.grey};
//   border-radius: ${({ theme }) => theme.borders.maximum};
//   cursor: pointer;
//   margin-left: 10px;
// `;

// const SliderTrack = styled.div<{percentage: number}>`
//   position: absolute;
//   height: 100%;
//   width: ${({percentage}) => percentage}%;
//   background-color: ${({ theme }) => theme.colors.common.white};
//   border-radius: ${({ theme }) => theme.borders.maximum};
// `;

// const SliderThumb = styled.div<{percentage: number}>`
//   position: absolute;
//   left: ${({percentage}) => percentage}%;
//   top: 50%;
//   width: 12px;
//   height: 12px;
//   background-color: ${({ theme }) => theme.colors.common.white};
//   border-radius: ${({ theme }) => theme.borders.maximum};
//   transform: translate(-50%, -50%);
//   cursor: pointer;
// `;