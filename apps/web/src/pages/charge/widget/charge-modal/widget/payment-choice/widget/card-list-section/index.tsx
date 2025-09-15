import { CardElem } from "./ui/card-elem";
import { paymentIcons } from "@/app/assets/payment";
import * as DC from '@dnd-kit/core';
import * as DS from '@dnd-kit/sortable';
import * as S from './style'
import { useDnd, CardData } from "./hook/useDnd";

export const CardListSection = () => {
  const initialCards: CardData[] = [
    { id: '1', image: paymentIcons.kbank, cardName: "케이뱅크 체크" },
    { id: '2', image: paymentIcons.kakaobank, cardName: "카카오뱅크 체크" },
    { id: '3', image: paymentIcons.tossbank, cardName: "신한 SOL 체크" },
    { id: '4', image: paymentIcons.sinhanbank, cardName: "토스카드" },
  ];

  const { cards, sensors, handleDragEnd } = useDnd(initialCards);

  return (
    <S.Container>
      <S.Title>카드 목록</S.Title>
      <S.CardListContainer>
        <DC.DndContext
          sensors={sensors}
          collisionDetection={DC.closestCenter}
          onDragEnd={handleDragEnd}
        >
          <DS.SortableContext items={cards} strategy={DS.verticalListSortingStrategy}>
            {cards.map((card) => (
              <CardElem
                key={card.id}
                id={card.id}
                image={card.image}
                cardName={card.cardName}
              />
            ))}
          </DS.SortableContext>
        </DC.DndContext>
      </S.CardListContainer>
    </S.Container>
  );
};
