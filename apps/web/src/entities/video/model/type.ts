// export interface VideoItem {
// 	streamId: string;
// 	title: string;
// 	url: string;
// 	username: string;
// 	nickname: string;
// 	profileImage?: string;
// }

export interface VideoListProps {
	videos: IStreamDataResponse[];
	maxColumns?: number;
}

export interface IStreamDataResponse {  
  streamId: string;
  title: string;
  url: string;
  userId: string;
  username: string;
  nickname: string;
  profileImage: string;
  followers: number;
  thumbnail? : string
}
