import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { VirtualModelSection } from "./widget/market-section/widget/virtual-model-section";
import { MarketSection } from "./widget/market-section";
import { Divider } from "./page/market-detail/ui/divider";
import { MarketCategorySection } from "./widget/market-section/widget/market-category-section";
import { PopularModelStore } from "./widget/market-section/widget/popular-model-store";
import { MainNoticeSlide } from "./widget/main-notice-slide";
import { MembershipSection } from "./widget/market-section/widget/membership-section";

export const Market = () => {
  return (
    <S.MarketContainer>
      <MainNoticeSlide />
      <Divider verticalPadding={34} />
      <MarketCategorySection />
      <Divider verticalPadding={34} />
      <MarketSection title="3D 모델">
        <VirtualModelSection />
      </MarketSection>
      <Divider verticalPadding={34} />
      <MarketSection title="인기 스토어">
        <PopularModelStore />
      </MarketSection>
    </S.MarketContainer>
  );
};
