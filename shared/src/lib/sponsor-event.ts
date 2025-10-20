type SponsorEventCallback = (nickname: string, amount: number) => void;

class SponsorEventManager {
  private listeners: SponsorEventCallback[] = [];

  subscribe(callback: SponsorEventCallback) {
    this.listeners.push(callback);
    
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  emit(nickname: string, amount: number) {
    this.listeners.forEach(callback => callback(nickname, amount));
  }
}

export const sponsorEventManager = new SponsorEventManager();
