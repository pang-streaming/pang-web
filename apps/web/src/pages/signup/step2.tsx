import {
  HeaderWrap,
  NextButton,
  SignupBox,
  SignupBoxElemContainer,
  SignupBoxTitle,
  SignUpContainer,
  SignupWrap,
  EmailInput,
  EmailInputWrapper,
  SendButton,
  HintText,
  NextButtonWrapper,
} from "../signup.style";

import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { StepDots } from "./stepDots";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import api from "../../api/api";
import { useSignup } from "./signup-context";

export const Step2 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(value));
  };

  const handleSendEmail = async () => {
    if (!emailValid) return;

    try {
      const res = await api.post("/auth/send-email", { email });
      alert("인증 메일이 발송되었습니다.");
    } catch (err) {
      alert("인증 메일 발송 실패!");
      console.error(err);
    }
  };

  const { setSignupData } = useSignup();

  const handleClick = () => {
    if (emailValid) {
      setSignupData({ email });
      navigate("/signup/step3");
    }
  };

  return (
    <SignUpContainer>
      <HeaderWrap>
        <img src={logo} />
      </HeaderWrap>
      <SignupWrap>
        <SignupBox>
          <SignupBoxElemContainer>
            {/* 고정 제목 */}
            <SignupBoxTitle>
              이메일 입력한 후,
              <br />
              이메일 인증을 진행해주세요
            </SignupBoxTitle>

            {/* 중간 컨텐츠 영역 */}
            <div style={{ flex: 1 }}>
              <EmailInputWrapper>
                <FiUser size={20} color="#999" />
                <EmailInput
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={handleEmailChange}
                />
                <SendButton onClick={handleSendEmail} disabled={!emailValid}>
                  <IoIosSend size={20} />
                </SendButton>
              </EmailInputWrapper>

              <HintText>
                인증 메일 발송 버튼을 눌러 인증을 진행해주세요.
              </HintText>
            </div>

            {/* 고정 버튼 */}
            <NextButtonWrapper>
              <NextButton
                onClick={handleClick}
                disabled={!emailValid}
                $active={emailValid}
              >
                다음 →
              </NextButton>
            </NextButtonWrapper>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <StepDots activeStep={2} />
            </div>
          </SignupBoxElemContainer>
        </SignupBox>
      </SignupWrap>
    </SignUpContainer>
  );
};
