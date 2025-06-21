import {MyElementsContainer, MypageContainer, MyPungContainer, MyTitle} from "./mypage.style.ts";
// import {UserInfo} from "../../types/user.ts";
// import { useNavigate } from "react-router-dom";

export const MyPage = () => {
    // const navigate = useNavigate();

    return (
        <MypageContainer>
            <MyTitle>MY</MyTitle>
            <MyElementsContainer>
                <MyPungContainer>

                </MyPungContainer>
            </MyElementsContainer>
        </MypageContainer>
    )
}
