import {useEffect, useState} from 'react';

interface Segment {
	id: string;
}

export const useSegment = (segments: Segment[], onChanged?: (activeSegmentId: string) => void, defaultSegmentId: number = 0) => {
	const initSegmentId = segments[defaultSegmentId].id;
	const [activeSegmentId, setActiveSegmentId] = useState(initSegmentId);
	
	const handleSegmentClick = (segmentId: string) => {
		setActiveSegmentId(segmentId);
	}
	
	useEffect(() => {
		onChanged?.(activeSegmentId);
	}, [activeSegmentId, onChanged]);
	
	return {
		activeSegmentId,
		handleSegmentClick
	}
}