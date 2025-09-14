import * as S from "./style";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { MyInfoSection } from "./widget/my-info-section";
import { MyPungSection } from "./widget/my-pung-section";
import { SettingsMenu } from "./widget/settings-menu";

export const MyPage = () => {
  return (
    <div>
      <TabTitleText>MY</TabTitleText>
      <S.Contaienr>
        <MyInfoSection />
        <MyPungSection />
        <SettingsMenu />
      </S.Contaienr>
    </div>
  );
};
