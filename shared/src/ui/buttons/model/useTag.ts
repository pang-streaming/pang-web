import {useEffect, useState} from "react";

interface UseTagProps {
	defaultTagId: string | null;
	onChanged?: (activeTagId: string | null) => void;
}

export const useTag = ({defaultTagId, onChanged}: UseTagProps) => {
	const [activeTagId, setActiveTagId] = useState<string | null>(defaultTagId);
	
	const handleTagClick = (tagId: string) => {
		if (tagId === activeTagId) {
			setActiveTagId(defaultTagId);
			return;
		}
		setActiveTagId(tagId);
	}
	
	const isActive = (tagId: string) => {
		return tagId === activeTagId;
	}
	
	useEffect(() => {
		onChanged?.(activeTagId);
	}, [onChanged, activeTagId]);
	
	return {
		handleTagClick,
		isActive
	}
}