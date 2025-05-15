import { FC } from 'react';
import {
    DashboardContainer,
    RecentLiveSection,
    StatsSection,
    UploadSection,
    NoticeSection,
    PangCommuSection
} from './dashboard.style';
import { FaUpload } from 'react-icons/fa';

interface LiveItem {
    title: string;
    date: string;
}

interface NoticeItem {
    title: string;
    date: string;
}

interface PangryuItem {
    content: string;
    date: string;
}

export const DashboardPage: FC = () => {
    const recentLives: LiveItem[] = [
        { title: '대듀의 배틀그라운드', date: '2025.04.01' },
        { title: '대듀의 배틀그라운드', date: '2025.03.29' },
    ];

    const subscriberCount = 15234;
    const subscriberIncrease = 127;

    const notices: NoticeItem[] = [
        { title: '스트리머 대듀 영구정지 사항', date: '2025-04-01' },
        { title: '영구정지 항목 업데이트 안내', date: '2025-03-25' },
    ];

    const pangryuItems: PangryuItem[] = [
        { content: '여러분 저 영구정지 당했어요', date: '2025-04-01' },
        { content: '깜짝 얼공 해명', date: '2025-03-31' },
        { content: '대듀입니다.', date: '2025-03-30' },
        { content: '후원 좀 하세요', date: '2025-03-29' },
        { content: '대듀업', date: '2025-03-28' },
    ];

    const handleUpload = () => {
        console.log('Upload clicked');
    };

    return (
        <DashboardContainer>
            <RecentLiveSection>
                <h2>최근 스트리밍 라이브</h2>
                {recentLives.map((live, index) => (
                    <div key={index} className="live-item">
                        <>
                            <div>{live.title}</div>
                            <div className="date">{live.date}</div>
                        </>
                        <button>다시보기</button>
                    </div>
                ))}
            </RecentLiveSection>

            <StatsSection>
                <h2>구독자 현황</h2>
                <div className="stat-box">
                    <div className="number">{subscriberCount.toLocaleString()}</div>
                    <div className="label">총 구독자</div>
                    <div className="change">+{subscriberIncrease} 이번 주 신규</div>
                </div>
            </StatsSection>

            <UploadSection>
                <h2>동영상 업로드</h2>
                <div className="upload-box" onClick={handleUpload}>
                    <FaUpload style={{ marginRight: '8px' }} />
                    <span>내 동영상을 간편하게 업로드 하세요</span>
                </div>
            </UploadSection>

            <NoticeSection>
                <h2>공지사항</h2>
                {notices.map((notice, index) => (
                    <div key={index} className="notice-item">
                        <div>{notice.title}</div>
                        <div className="date">{notice.date}</div>
                    </div>
                ))}
            </NoticeSection>

            <PangCommuSection>
                <h2>팡커뮤</h2>
                {pangryuItems.map((item, index) => (
                    <div key={index} className="pangryu-item">
                        <div>{item.content}</div>
                        <div className="date">{item.date}</div>
                    </div>
                ))}
            </PangCommuSection>
        </DashboardContainer>
    );
};
