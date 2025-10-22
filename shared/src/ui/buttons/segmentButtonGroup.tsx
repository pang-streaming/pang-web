import styled from "styled-components";
import { useSegment } from "./model/useSegment";
import { SegmentButton } from "./segmentButton";
import React from "react";

export interface Segment {
  id: string;
  name: string;
}

interface SegmentButtonGroupProps {
  segments: Segment[];
  defaultSegmentIndex?: number;
  onSegmentChange?: (activeSegmentId: string) => void;
  selectedSegmentId?: string; // ✅ 추가
}

export const SegmentButtonGroup = ({
  segments,
  defaultSegmentIndex,
  onSegmentChange,
  selectedSegmentId, // ✅ 외부 상태 받기
}: SegmentButtonGroupProps) => {
  const { activeSegmentId, handleSegmentClick, setActiveSegmentId } = useSegment(
    segments,
    onSegmentChange,
    defaultSegmentIndex
  );

  React.useEffect(() => {
    if (selectedSegmentId && selectedSegmentId === activeSegmentId) {
      setActiveSegmentId(selectedSegmentId);
    }
  }, [selectedSegmentId]);

  return (
    <SegmentWrapper>
      {segments.map((segment) => (
        <SegmentButton
          key={segment.id}
          text={segment.name}
          isActive={activeSegmentId === segment.id}
          onClick={() => handleSegmentClick(segment.id)}
        />
      ))}
    </SegmentWrapper>
  );
};

const SegmentWrapper = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: row;
`;
