

export interface OtherUser {

    nickname : string
    profileImage? : string
    bannerImag? : string
    description? : string
    communityId : number
    followerCount : number
    isFollowed : boolean
}


export interface OtherUserResponse {
    status: string;
    message: string;
    data: OtherUser;
    timestamp: string
}
