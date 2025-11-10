import * as S from "./style";
import { Header } from "./widget/header";
import * as C from './widget/index'
import { useChargeModal } from "./model";

interface ChargeModalProps {
  initialType?: "pung-charge" | "payment-choice" | "payment-add" | "auto-charge";
  chargeType?: "mypung" | "autochargepung";
  onClose?: () => void;
}

export const ChargeModal = ({ initialType = "pung-charge", chargeType = "mypung", onClose }: ChargeModalProps) => {
  const {
    currentType,
    pungAmount,
    cardRefreshTrigger,
    handlePungChange,
    handleToPaymentChoice,
    handleToPaymentAdd,
    handleBackToPaymentChoice,
    handleCardAdded,
    handleBackToPungCharge,
    handleCharge,
  } = useChargeModal(initialType, onClose);

  return (
    <S.Container onClick={(e) => e.stopPropagation()}>
      <Header onClose={onClose}>
        {currentType === "auto-charge"
          ? "펑 자동충전"
          : currentType === "pung-charge"
          ? "펑 충전하기"
          : currentType === "payment-choice"
            ? "결제수단 선택"
            : "결제수단 추가"}
      </Header>
      <S.Content>
        {currentType === "auto-charge" ? (
          <C.AutoCharge onClose={onClose} />
        ) : currentType === "pung-charge" ? (
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
