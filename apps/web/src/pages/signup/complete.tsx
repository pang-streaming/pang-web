import React, { useEffect, useState } from "react";
import JSConfetti from "js-confetti";
import logo2 from "../../assets/pang-emotion-logo.png";
import { useNavigate } from "react-router-dom";

import {
  ContentWrapper,
  NextButton,
  NextButtonWrapper,
  CompleteContainer,
  SuccessMessage,
} from "../signup.style";

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
    <CompleteContainer>
      <ContentWrapper>
        <img src={logo2} />
        <SuccessMessage>PNAG 회원이 되신 것을 축하해요!</SuccessMessage>
      </ContentWrapper>

      <NextButtonWrapper>
        <NextButton $active={true} onClick={handleClick}>
          로그인 →
        </NextButton>
      </NextButtonWrapper>
    </CompleteContainer>
  );
};
