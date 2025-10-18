import React, {useCallback, useState} from "react";

interface DragState {
	draggingIndex: number | null;
	handleDragStart: (index: number) => void;
	handleDragOver: (index: number) => void;
	handleDragEnd: () => void;
}

export const useDragAndDrop = (items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>): DragState => {
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
	
	const handleDragStart = useCallback((index: number) => {
		setDraggingIndex(index);
	}, []);
	
	const handleDragOver = useCallback((index: number) => {
		if (draggingIndex === null || draggingIndex === index) return;
		
		setItems(prevItems => {
			const newItems = Array.from(prevItems);
			const [draggedItem] = newItems.splice(draggingIndex, 1);
			newItems.splice(index, 0, draggedItem);
			return newItems;
		});
		setDraggingIndex(index);
	}, [draggingIndex, setItems]);
	
	const handleDragEnd = useCallback(() => {
		setDraggingIndex(null);
	}, []);
	
	return {
		draggingIndex,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
	};
};