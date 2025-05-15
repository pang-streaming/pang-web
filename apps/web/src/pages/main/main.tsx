
import { FollowingContainer, FollowingTitle } from "../follow/following.style"
import { GridContainer } from "./main.style"
import dlook from '../../assets/dlook.png'
import { LiveCard } from "../explore/livecard/livecard"
import { MainLiveCard } from "../explore/livecard/mainlivecard/mainlivecard"




export const Main = () => {
    const lives = [
        {
            id: 1,
            profileImage: dlook,
            streamerName: "먼지오빠",
            title: "안녕하세요"
        },
        {
            id: 2,
            profileImage: dlook,
            streamerName: "먼지오빠",
            title: "안녕하세요"
        },
        {
            id: 3,
            profileImage: dlook,
            streamerName: "먼지오빠",
            title: "안녕하세요"
        }
    ];
    return (
            <FollowingContainer>
              <MainLiveCard 
                thumbnail={dlook}
                profileImage={dlook}
                streamerName="파뿌리"
                followerCount={18.2}
                viewerCount={201}
                category="마인크래프트"
                badge={true}
              />
                <FollowingTitle>이 방송 어때요?</FollowingTitle>
                <GridContainer>
                        {lives.map(() => (
                                <LiveCard profileImage={dlook} title="안녕하세요" streamerName="김강연" />
                            ))}
                </GridContainer>
            </FollowingContainer>
    )
}