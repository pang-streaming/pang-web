import { useEffect, useState } from "react";
import axios from "axios";

import { FollowingContainer, FollowingTitle } from "../follow/following.style"
import { GridContainer } from "./main.style"
import { LiveCard } from "../explore/livecard/livecard"
import { MainLiveCard } from "../explore/livecard/mainlivecard/mainlivecard"

export interface LiveStream {
    nickname: string;
    profileImage: string;
    badgeImage: string;
    title: string;
    streamImage: string;
    streamUrl: string;
}

export const Main = () => {
    const [lives, setLives] = useState<LiveStream[]>([]);
    const [popularLives, setPopularLives] = useState<LiveStream[]>([]);
    const [currentPopularIndex, setCurrentPopularIndex] = useState(0);

    useEffect(() => {
        const fetchLiveStreams = async () => {
            try {
                const response = await axios.get("http://9fc2-221-168-22-205.ngrok-free.app/stream/items");
                if (Array.isArray(response.data)) {
                    setLives(response.data);
                }
            } catch (error) {
                console.error("라이브 스트림 불러오기 실패:", error);
            }
        };

        const fetchPopularStreams = async () => {
            try {
                const response = await axios.get("http://9fc2-221-168-22-205.ngrok-free.app/stream/items/popular");
                if (Array.isArray(response.data)) {
                    setPopularLives(response.data.slice(0, 3));
                }
            } catch (error) {
                console.error("인기 라이브 불러오기 실패:", error);
            }
        };

        fetchLiveStreams();
        fetchPopularStreams();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPopularIndex(prev => (prev + 1) % popularLives.length);
        }, 5000);

        return () => clearInterval(interval); // cleanup
    }, [popularLives]);

    const currentPopularLive = popularLives[currentPopularIndex];

    return (
        <FollowingContainer>
                {currentPopularLive && (
                    <MainLiveCard
                        streamImage={currentPopularLive.streamImage}
                        profileImage={currentPopularLive.profileImage}
                        nickname={currentPopularLive.nickname}
                        badgeImage={currentPopularLive.badgeImage}
                        title={currentPopularLive.title}
                        streamUrl={currentPopularLive.streamUrl}
                        // followerCount={18.2}
                        // viewerCount={201}
                        // category="마인크래프트"
                    />
                )}
                <FollowingTitle>이 방송 어때요?</FollowingTitle>
            <GridContainer>
                {lives.map((live) => (
                    <LiveCard
                        key={live.nickname}
                        profileImage={live.profileImage}
                        title={live.title}
                        nickname={live.nickname}
                        badgeImage={live.badgeImage}
                        streamImage={live.streamImage}
                        streamUrl={live.streamUrl}
                    />
                ))}
            </GridContainer>
            </FollowingContainer>
    )
}