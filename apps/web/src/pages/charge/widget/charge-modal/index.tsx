import * as S from "./style";
import { Header } from "./widget/header";
import * as C from './widget/index'
import { useState } from "react";

interface ChargeModalProps {
  initialType?: "pung-charge" | "payment-choice" | "payment-add";
  onClose?: () => void;
}

export const ChargeModal = ({ initialType = "pung-charge", onClose }: ChargeModalProps) => {
  const [currentType, setCurrentType] = useState<"pung-charge" | "payment-choice" | "payment-add">(initialType);
  const [pungAmount, setPungAmount] = useState(1000);

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

  const handleBackToPungCharge = () => {
    setCurrentType("pung-charge");
  };

  return (
    <S.Container>
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
          <C.PaymentChoice pungAmount={pungAmount} toPaymentAdd={handleToPaymentAdd} onBackToPungCharge={handleBackToPungCharge} />
        ) : (
          <C.PaymentAdd onBackToPaymentChoice={handleBackToPaymentChoice} />
        )}
      </S.Content>
    </S.Container>
  );
};
