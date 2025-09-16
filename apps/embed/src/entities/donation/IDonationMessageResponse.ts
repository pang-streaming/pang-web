export interface IDonationMessageResponse {
  id: string;
  roomId: string;
  username: string;
  nickname: string;
  amount: number;
  message?: string;
  audio?: string;
  youtube?: string;
}