export interface Video {
    streamId:string,
    title:string
    url:string,
    username:string,
    nickname:string,
    profileImage?:string,
}

export interface VideoResponse {
    status: string;
    data: Video[];
    timestamp: string;
}