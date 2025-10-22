export interface IChatMessageResponse {
  id: string;
  roomId: string;
  username: string;
  nickname: string;
  message: string;
  color?: string;
}