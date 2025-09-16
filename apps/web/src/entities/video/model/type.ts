export interface VideoItem {
	streamId: string;
	title: string;
	url: string;
	username: string;
	nickname: string;
	profileImage?: string;
}

export interface VideoListProps {
	videos: VideoItem[];
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
}
