import {FollowingContainer, FollowingStreamersContainer, FollowingTitle} from "./following.style.ts";
import {LiveCard} from "../explore/livecard/livecard.tsx";
import dlook from "../../assets/dlook.png"
import { FollowingCard } from "../../components/followingcard/followingcard.tsx";
import { GridContainer } from "../main/main.style.ts";
import { useNavigate } from "react-router-dom";

export const Following = () => {

    const navigate = useNavigate();

    const handleClickLive = (live: any) => {
        navigate('/livedetail', { state: live })
    }

    const streamers = [
        {
            id: 1,
            profileImage: dlook,
            streamerName: "먼지오빠",
            followerCount: 15,
        },
        {
            id: 2,
            profileImage: dlook,
            streamerName: "대듀",
            followerCount: 16.3
        },
        {
            id: 1,
            profileImage: dlook,
            streamerName: "먼지오빠",
            followerCount: 15
        },
        {
            id: 2,
            profileImage: dlook,
            streamerName: "대듀",
            followerCount: 16.3
        },
        {
            id: 1,
            profileImage: dlook,
            streamerName: "먼지오빠",
            followerCount: 15
        },
        {
            id: 2,
            profileImage: dlook,
            streamerName: "대듀",
            followerCount: 16.3
        },
    ]
    //더미유저

    const lives = [
        {
            id: 1,
            profileImage: dlook,
            streamerName: "먼지오빠",
            title: "안녕하세요",
            thumbnail: dlook
        },
        {
            id: 2,
            profileImage: dlook,
            streamerName: "대듀",
            title: "안녕하세요ㅇㅇㅇㅇ",
            thumbnail: dlook
        },
        {
            id: 3,
            profileImage: dlook,
            streamerName: "이상은",
            title: "안녕하세요이상은입니다",
            thumbnail: dlook
        },
        {
            id: 4,
            profileImage: dlook,
            streamerName: "먼지오빠",
            title: "안녕하세요",
            thumbnail: dlook
        },
        {
            id: 5,
            profileImage: dlook,
            streamerName: "대듀",
            title: "안녕하세요ㅇㅇㅇㅇ",
            thumbnail: dlook
        },
        {
            id: 6,
            profileImage: dlook,
            streamerName: "이상은",
            title: "안녕하세요이상은입니다",
            thumbnail: dlook
        },
        {
            id: 7,
            profileImage: dlook,
            streamerName: "먼지오빠",
            title: "안녕하세요",
            thumbnail: dlook
        },
        {
            id: 8,
            profileImage: dlook,
            streamerName: "대듀",
            title: "안녕하세요ㅇㅇㅇㅇ",
            thumbnail: dlook
        },
        {
            id: 9,
            profileImage: dlook,
            streamerName: "이상은",
            title: "안녕하세요이상은입니다",
            thumbnail: dlook
        },
    ]

    return (
        <FollowingContainer>
            <FollowingTitle>팔로잉</FollowingTitle>
            <FollowingStreamersContainer>
                {streamers.map((streamer) => (
                    <FollowingCard 
                    profileImage={streamer.profileImage} 
                    streamerName={streamer.streamerName} 
                    followerCount={streamer.followerCount} 
                    />
                ))}
            </FollowingStreamersContainer>
            
            <FollowingTitle>라이브   {lives.length}</FollowingTitle>
            <GridContainer>
                {lives.map((live) => (
                    <div onClick={() => handleClickLive(live)}>
                        {/* <LiveCard profileImage={dlook} title={live.title} streamerName={live.streamerName} /> */}
                    </div>
                    ))}
            </GridContainer>  
            <FollowingTitle>최근 동영상</FollowingTitle>
            <GridContainer>
                {lives.map((live) => (
                    <div onClick={() => handleClickLive(live)}>
                        {/* <LiveCard profileImage={dlook} title={live.title} streamerName={live.streamerName} /> */}
                    </div>
                    ))}
            </GridContainer>    
        </FollowingContainer>
    )
}