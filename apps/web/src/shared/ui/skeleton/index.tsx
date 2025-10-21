import React from "react";
import styled, { keyframes, css } from "styled-components";

/* ================= SkeletonBox ================= */
type Variant = "shimmer" | "solid";


interface SkeletonGridProps {
  count?: number;
  columns?: number;
  minWidth?: number;
  gap?: number;
  itemHeight?: number | string;
}

export const SkeletonGrid = ({
  count = 6,
  columns,
  minWidth,
  gap = 12,
  itemHeight = 160,
}: SkeletonGridProps) => {
  const items = new Array(count).fill(0);
  return (
    <Grid $gap={gap} $columns={columns} $minWidth={minWidth}>
      {items.map((_, i) => (
        <Card key={i}>
          <SkeletonBox width="100%" height={itemHeight} radius={8} />
          <div style={{ padding: 8 }}>
            <SkeletonBox width="70%" height={14} radius={6} style={{ marginBottom: 8 }} />
            <SkeletonBox width="40%" height={14} radius={6} />
          </div>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div<{ $gap: number; $columns?: number; $minWidth?: number }>`
  display: grid;
  margin-bottom: 20px;
  gap: ${({ $gap }) => `${$gap}px`};
  ${({ $columns, $minWidth }) =>
    $minWidth
      ? css`
          grid-template-columns: repeat(auto-fill, minmax(${`${$minWidth}px`}, 1fr));
        `
      : css`
          grid-template-columns: repeat(${($columns as number) || 3}, 1fr);
        `}
`;



const Card = styled.div`
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

interface SkeletonBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  variant?: Variant;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export const SkeletonBox = ({
  width = "100%",
  height = 16,
  radius = 6,
  variant = "shimmer",
  style,
  ...rest
}: SkeletonBoxProps) => (
  <StyledBox
    role="status"
    aria-busy="true"
    $width={width}
    $height={height}
    $radius={radius}
    $variant={variant}
    style={style}
    {...rest}
  />
);

const shimmer = keyframes`
  0% { transform: translateX(-100%) }
  100% { transform: translateX(100%) }
`;

const baseBg = css`
  background-color: ${({ theme }) => theme.colors.content.normal || "#2b2b2b"};
`;

const StyledBox = styled.div<{
  $width: string | number;
  $height: string | number;
  $radius: string | number;
  $variant: Variant;
}>`
  width: ${({ $width }) => (typeof $width === "number" ? `${$width}px` : $width)};
  height: ${({ $height }) => (typeof $height === "number" ? `${$height}px` : $height)};
  border-radius: ${({ $radius }) => (typeof $radius === "number" ? `${$radius}px` : $radius)};
  position: relative;
  overflow: hidden;
  ${baseBg}

  ${({ $variant }) =>
    $variant === "shimmer" &&
    css`
      &:after {
        content: "";
        position: absolute;
        top:0; left:0; bottom:0; right:0;
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,0.07) 50%,
          rgba(255,255,255,0) 100%
        );
        transform: translateX(-100%);
        animation: ${shimmer} 1.2s linear infinite;
        mix-blend-mode: overlay;
      }
    `}
`;

/* ================= FollowingCard Skeleton ================= */

export const FollowingCardSkeleton = () => {
  const skeletons = new Array(8).fill(0);

  return (
    <FollowingCardGrid>
      {skeletons.map((_, i) => (
        <FollowingCardContainer key={i}>
          <SkeletonBox width={90} height={90} radius={999} />
          <SkeletonBox width={80} height={12} radius={4} style={{ marginTop: 8 }} />
          <SkeletonBox width={40} height={12} radius={4} style={{ marginTop: 4 }} />
        </FollowingCardContainer>
      ))}
    </FollowingCardGrid>
  );
};

const FollowingCardGrid = styled.div`
  margin-top: 16px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 4px;
`;

const FollowingCardContainer = styled.div`
  width: 90px;
  height: 137px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

/* ================= Transaction Skeleton ================= */
export const TransactionSkeleton = ({ count = 6 }: { count?: number }) => {
  const items = new Array(count).fill(0);

  return (
    <TransactionGrid>
      {items.map((_, i) => (
        <TransactionCard key={i}>
          <SkeletonBox width="20%" height={40} radius={4} />
          <SkeletonBox width="50%" height={40} radius={4}/>
          <SkeletonBox width="25%" height={40} radius={4}/>
        </TransactionCard>
      ))}
    </TransactionGrid>
  );
};

const TransactionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TransactionCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background.normal || "#1e1e1e"};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

/* ================= VirtualModelElem Skeleton ================= */
export const VirtualModelElemSkeleton = () => (
  <VirtualContainer>
    <SkeletonBox width={200} height={200} radius={16} style={{ marginBottom: 10 }} />
    <SkeletonBox width="70%" height={16} radius={4} style={{ marginBottom: 8 }} />
    <SkeletonBox width="40%" height={18} radius={4} />
  </VirtualContainer>
);

const VirtualContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 150px;
`;




export const CategorySkeleton = () => {
  const skeletons = new Array(12).fill(0);

  return (
    <CategoryGrid>
      {skeletons.map((_, i) => (
        <SkeletonBox key={i} height="300px" radius={12} />
      ))}
    </CategoryGrid>
  );
};

const CategoryGrid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 800px) { grid-template-columns: repeat(4, 1fr); }
  @media (min-width: 1200px) { grid-template-columns: repeat(5, 1fr); }
  @media (min-width: 1600px) { grid-template-columns: repeat(6, 1fr); }
  @media (min-width: 1900px) { grid-template-columns: repeat(7, 1fr); }
  @media (min-width: 2090px) { grid-template-columns: repeat(8, 1fr); }
`;