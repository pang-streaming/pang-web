import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
import { ChargeBox } from "./widget/charge-box";
import { ListHeader } from "./widget/list-header";

const segments: Segment[] = [
  {
    id: "use",
    name: "사용내역",
  },
  {
    id: "buy",
    name: "구매내역",
  },
];

export const Charge = () => {
  return (
    <div>
      <TabTitleText>My 펑</TabTitleText>
      <S.Container>
        <S.ChargeBoxRow>
          <ChargeBox type="mypung" />
          <ChargeBox type="chargepung" />
        </S.ChargeBoxRow>
        <SegmentButtonGroup segments={segments} />
        <ListHeader></ListHeader>
      </S.Container>
    </div>
  );
};
