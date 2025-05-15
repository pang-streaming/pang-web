import { NoticeContainer, NoticeText, NoticeWrapper } from "./notice-box.style";
import NoticeIcon from '../../../../assets/megaphone.svg';
import { Spacer } from "../../livedetail.style";


export const NoticeBox = () => {
    return (
        <NoticeWrapper>
        <NoticeContainer>
            <img src={NoticeIcon} alt="공지사항" style={{marginTop: 2}}/>
            <NoticeText>쾌적한 시청 환경을 위해 일부 메시지는 필터링 됩니다.<br/>클린 라이브 채팅 문화를 만들기에 동참해 주세요!</NoticeText>
        </NoticeContainer>
        </NoticeWrapper>
    );
}