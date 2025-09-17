import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
import { ChargeBox } from "./widget/charge-box";
import { ListHeader } from "./widget/list-header";
import { useState } from "react";

const segments: Segment[] = [
  {
    id: "use",
    name: "사용내역",
  },
  {
    id: "buy",
    name: "충전내역",
  },
];

export const Charge = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>("use");

  return (
    <div>
      <TabTitleText>My 펑</TabTitleText>
      <S.Container>
        <S.ChargeBoxRow>
          <ChargeBox type="mypung" />
          <ChargeBox type="chargepung" />
        </S.ChargeBoxRow>
        <SegmentButtonGroup 
          segments={segments} 
          onSegmentChange={setSelectedSegment}
        />
        <ListHeader segmentType={selectedSegment} />
      </S.Container>
    </div>
  );
};
