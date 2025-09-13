import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { SegmentButton } from "@pang/shared/ui";
import { ChargeBox } from "./widget/charge-box";
import { ListHeader } from "./widget/list-header";

export const Charge = () => {
  return (
    <div>
      <TabTitleText children="MY 펑" />

      <S.Contaienr>
        <S.ChargeBoxRow>
          <ChargeBox type="mypung" />
          <ChargeBox type="chargepung" />
        </S.ChargeBoxRow>
        <S.SegmentButtonRow>
          <SegmentButton text="사용 내역" onClick={() => {}} />
          <SegmentButton text="구매 내역" onClick={() => {}} />
        </S.SegmentButtonRow>
        <ListHeader >

        </ListHeader>
      </S.Contaienr>
    </div>
  );
};
