

export interface LastVideo {
    streamId: string;
    title: string;
    url: string;
    username: string;
    nickname: string;
    profileImage: string;
    viewCount: number;
    thumbnail?: string;
  }

  
  export interface LastVideoResponse {
    status: string; 
    message: string;
    data: LastVideo[];
    timestamp: string;
  }
  


export interface LastVideoListProps {
	videos: LastVideo[];
	maxColumns?: number;
}
