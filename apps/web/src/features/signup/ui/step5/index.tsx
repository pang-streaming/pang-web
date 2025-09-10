

import { useEffect, useState } from "react";
import logo2 from "../../../../app/assets/pang-emotion-logo.png";
import { useNavigate } from "react-router-dom";
import * as S from '@/pages/signup/style';

import JSConfetti from "js-confetti";

export const Complete = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("../login");
  };

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#f9bec7",
      ],
      confettiRadius: 5,
      confettiNumber: 500,
    });

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.CompleteContainer>
      <S.ContentWrapper>
        <img src={logo2} />
        <S.SuccessMessage>PNAG 회원이 되신 것을 축하해요!</S.SuccessMessage>
      </S.ContentWrapper>

      <S.NextButtonWrapper>
        <S.NextButton $active={true} onClick={handleClick}>
          로그인 →
        </S.NextButton>
      </S.NextButtonWrapper>
    </S.CompleteContainer>
  );
};
