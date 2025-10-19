import styled from "styled-components"
import {FaRegHeart} from "react-icons/fa";
import { useState } from "react";
import { sendLike } from "@/features/market/api";

interface HeartBoxProps {
  productId: string;
  initialCount?: number;
  onSuccess?: (newCount: number) => void;
}

export const HeartBox = ({ productId, initialCount = 0, onSuccess }: HeartBoxProps) => {
  const [count, setCount] = useState<number>(initialCount);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await sendLike(productId);
      const next = count + 1;
      setCount(next);
      onSuccess?.(next);
    } catch (e) {
      // ignore for now or show toast if available
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container onClick={handleClick} aria-disabled={loading}>
      <FaRegHeart size={20} />
      <Count>{count.toLocaleString()}</Count>
    </Container>
  )
}

const Container = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: ${({theme}) => theme.borders.xlarge};
  border: 2px solid ${({theme}) => theme.colors.border.normal};
	color: ${({theme}) => theme.colors.border.normal};
	user-select: none;
	cursor: pointer;
	&:hover {
			background-color: ${({theme}) => theme.colors.hover.light};
	}
`

const Count = styled.span`
    font-size: ${({theme}) => theme.font.medium};
    font-weight: 500;
`