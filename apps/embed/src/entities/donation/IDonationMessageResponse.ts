export interface IDonationMessageResponse {
  id: string;
  roomId: string;
  username: string;
  amount: number;
  message?: string;
  audio?: string;
  youtube?: string;
}