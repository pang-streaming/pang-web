import {useEffect, useState} from 'react';

interface Segment {
	id: string;
}

export const useSegment = (segments: Segment[], onChanged?: (activeSegmentId: string) => void, defaultSegmentId: number = 0) => {
	const initSegmentId = segments[defaultSegmentId]?.id || segments[0].id;
	const [activeSegmentId, setActiveSegmentId] = useState(initSegmentId);
	
	useEffect(() => {
		const newSegmentId = segments[defaultSegmentId]?.id || segments[0].id;
		setActiveSegmentId(newSegmentId);
	}, [defaultSegmentId, segments]);
	
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