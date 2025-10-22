import * as S from "./style";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { MyInfoSection } from "./widget/my-info-section";
import { MyPungSection } from "./widget/my-pung-section";
import { SettingsMenu } from "./widget/settings-menu";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const MyPage = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  useEffect(() => {
    const handlePopState = () => {
      if (from === "streamer") {
        window.location.href = import.meta.env.VITE_STREAMER_URL;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [from]);

  return (
    <div>
      <TabTitleText>MY</TabTitleText>
      <S.Contaienr>
        <MyInfoSection />
        <MyPungSection />
        <SettingsMenu from={from} />
      </S.Contaienr>
    </div>
  );
};
