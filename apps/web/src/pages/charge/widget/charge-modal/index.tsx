import * as S from "./style";
import { Header } from "./widget/header";
import * as C from './widget/index'
import { useState } from "react";
import { paymentApi } from "@/entities/payment/api";

interface ChargeModalProps {
  initialType?: "pung-charge" | "payment-choice" | "payment-add";
  onClose?: () => void;
}

export const ChargeModal = ({ initialType = "pung-charge", onClose }: ChargeModalProps) => {
  const [currentType, setCurrentType] = useState<"pung-charge" | "payment-choice" | "payment-add">(initialType);
  const [pungAmount, setPungAmount] = useState(1000);
  const [cardRefreshTrigger, setCardRefreshTrigger] = useState(0);

  const handlePungChange = (amount: number) => {
    setPungAmount(amount);
  };

  const handleToPaymentChoice = () => {
    setCurrentType("payment-choice");
  };

  const handleToPaymentAdd = () => {
    setCurrentType("payment-add");
  };

  const handleBackToPaymentChoice = () => {
    setCurrentType("payment-choice");
  };

  const handleCardAdded = () => {
    setCardRefreshTrigger(prev => prev + 1);
  };

  const handleBackToPungCharge = () => {
    setCurrentType("pung-charge");
  };

  const handleCharge = async (cardId: string, amount: number) => {
    try {
      const result = await paymentApi.processPayment(cardId, amount);
      console.log('결제 성공:', result);

      if (onClose) {
        onClose();
      }

      alert(`결제가 완료되었습니다!`);

    } catch (error) {
      console.error('결제 실패:', error);
      alert('결제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <Header onClose={onClose}>
        {currentType === "pung-charge"
          ? "펑 충전하기"
          : currentType === "payment-choice"
            ? "결제수단 선택"
            : "결제수단 추가"}
      </Header>
      <S.Content>
        {currentType === "pung-charge" ? (
          <C.PungCharge pungAmount={pungAmount} onPungChange={handlePungChange} toPaymentChoice={handleToPaymentChoice} />
        ) : currentType === "payment-choice" ? (
          <C.PaymentChoice pungAmount={pungAmount} toPaymentAdd={handleToPaymentAdd} onBackToPungCharge={handleBackToPungCharge} onCardAdded={handleCardAdded} cardRefreshTrigger={cardRefreshTrigger} onCharge={handleCharge} />
        ) : (
          <C.PaymentAdd onBackToPaymentChoice={handleBackToPaymentChoice} onCardAdded={handleCardAdded} />
        )}
      </S.Content>
    </S.Container>
  );
};
