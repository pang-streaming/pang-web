
import api from "../../api/api";
import type { FollowResponse } from "./model/type";


export const fetchMyFollowing = async (username: string): Promise<FollowResponse> => {
    const res = await api.get("/follow/following", {params : { username }})
    return res.data;
}

export const fetchMyFollower = async (username: string): Promise<FollowResponse> => {
    const res = await api.get("/follow/follower", {params : { username }})
    return res.data;
}

export const followingOtherUser = async (username: string): Promise<FollowResponse> => {
    const res = await api.post("/follow",null, {params : { username }});
    return res.data;
}