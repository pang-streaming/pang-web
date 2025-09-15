import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import YouTube from "react-youtube";
import { useSocket } from "../../shared/hooks/useSocketHook";
import type { IDonationMessageResponse } from "../../entities/donation/IDonationMessageResponse";
import { playBase64Audio } from "../../shared/lib/audio-lib";
import { useLocation } from "react-router-dom";

export const DonationPage = () => { 
    const [queue, setQueue] = useState<IDonationMessageResponse[]>([]);
    const [current, setCurrent] = useState<IDonationMessageResponse | null>(null);
    const isPlayingRef = useRef(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = String(queryParams.get("username"));

    useSocket(roomId, (data) => {
        setQueue((prev) => [...prev, data]);
    });

    useEffect(() => {
        if (!isPlayingRef.current && queue.length > 0) {
            playDonation(queue[0]);
        }
    }, [queue]);

    const playDonation = async (donation: IDonationMessageResponse) => {
    isPlayingRef.current = true;
    setCurrent(donation);

    if (donation.audio) {
        await playBase64Audio(donation.audio);
    }

    if (donation.youtube) return;

    await new Promise((resolve) => setTimeout(resolve, 3000));
        closeDonation();
    };

    const closeDonation = () => {
        setQueue((prev) => prev.slice(1));
        setCurrent(null);
        isPlayingRef.current = false;
    };

    if (!current) 
        return;

    return (
        <DonationMessageContainer key={current.id}>
            {current.youtube && (
                <YouTube
                    videoId={current.youtube}
                    opts={{
                        width: "480",
                        height: "270",
                        playerVars: { autoplay: 1 },
                    }}
                    onEnd={closeDonation}
                />
            )}

            <DonationMessageTextTitle>
                <DonationMessageUsername>
                {current.username}
                </DonationMessageUsername>
                님이&nbsp;
                <DonationMessagePrice>
                {current.amount.toLocaleString()}
                </DonationMessagePrice>
                &nbsp;후원!
            </DonationMessageTextTitle>

            <DonationMessageTextContainer>
                {current.message ? current.message : current.youtube ? "[영상 후원]" : "[메시지 없음]"}
            </DonationMessageTextContainer>
        </DonationMessageContainer>
    )
}

const bounceAnimation = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const DonationMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 600;
  color: white;
  gap: 5px;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
  animation: ${bounceAnimation} 0.5s ease-out;
`;

const DonationMessageTextContainer = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const DonationMessageUsername = styled.div`
  color: #ff0055ff;
`;

const DonationMessagePrice = styled.div`
  color: #ff3377ff;
`;

const DonationMessageTextTitle = styled.div`
  display: flex;
  font-size: 24px;
  flex-direction: row;
`;
