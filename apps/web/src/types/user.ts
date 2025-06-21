export interface UserInfo {
    id: string;
    username: string;
    email: string;
    nickname: string;
    age: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    profileImage: string;
    bannerImage: string;
    isAdult: boolean;
    role: 'USER' | 'STREAMER' | 'ADMIN';
    isAlarm: boolean;
}