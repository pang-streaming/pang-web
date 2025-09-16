import {useSegment} from "./model/useSegment";
import styled from "styled-components";
import {SegmentButton} from "./segmentButton";

export interface Segment {
	id: string;
	name: string;
}

interface SegmentButtonGroupProps {
	segments: Segment[];
	defaultSegmentIndex?: number;
	onSegmentChange?: (activeSegmentId: string) => void;
}

export const SegmentButtonGroup = ({ segments, defaultSegmentIndex, onSegmentChange }: SegmentButtonGroupProps) => {
	const { activeSegmentId, handleSegmentClick } = useSegment(segments, onSegmentChange, defaultSegmentIndex);
	
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
	)
}


const SegmentWrapper = styled.div`
  margin: 16px 0;
    display: flex;
	flex-direction: row;
`;