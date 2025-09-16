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