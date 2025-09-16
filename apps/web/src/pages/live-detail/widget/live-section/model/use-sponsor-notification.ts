import { useState, useCallback, useEffect } from "react";
import { sponsorEventManager } from "@/shared/lib/sponsor-event";

interface SponsorNotificationState {
  nickname: string;
  amount: number;
  isVisible: boolean;
}

export const useSponsorNotification = () => {
  const [sponsorNotification, setSponsorNotification] = useState<SponsorNotificationState>({
    nickname: "",
    amount: 0,
    isVisible: false,
  });

  const showSponsorNotification = useCallback((nickname: string, amount: number) => {
    setSponsorNotification({
      nickname,
      amount,
      isVisible: true,
    });

    setTimeout(() => {
      hideSponsorNotification();
    }, 3000);
  }, []);

  const hideSponsorNotification = useCallback(() => {
    setSponsorNotification(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  useEffect(() => {
    const unsubscribe = sponsorEventManager.subscribe((nickname, amount) => {
      showSponsorNotification(nickname, amount);
    });

    return unsubscribe;
  }, [showSponsorNotification]);

  return {
    sponsorNotification,
    showSponsorNotification,
    hideSponsorNotification,
  };
};
