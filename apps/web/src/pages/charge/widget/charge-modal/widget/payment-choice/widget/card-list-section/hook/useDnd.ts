import { useState } from 'react';
import * as DC from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';

export interface CardData {
  id: string;
  image: string;
  cardName: string;
}

export const useDnd = (initialCards: CardData[]) => {
  const [cards, setCards] = useState<CardData[]>(initialCards);

  const sensors = DC.useSensors(
    DC.useSensor(DC.PointerSensor),
    DC.useSensor(DC.KeyboardSensor, {
      coordinateGetter: DS.sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DC.DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return DS.arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return {
    cards,
    sensors,
    handleDragEnd,
  };
};
