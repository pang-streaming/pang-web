import api from "../api/api";
import { UserInfo } from '../types/user.ts';

interface UserResponse {
    status: string;
    message: string;
    data: UserInfo;
    timestamp: string;
}

export const fetchMyInfo = async (): Promise<UserInfo> => {
    try {
        const response = await api.get<UserResponse>('/user/me');
        return response.data.data;

    } catch (error) {
        console.error('내 정보 불러오기 실패:', error);
        throw error;
    }
};