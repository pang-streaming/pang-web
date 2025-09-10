import * as S from '@/pages/signup/style';
import Logo from "@/app/assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { useSignup } from "../../../auth/model/signup-context";
import { StepDots } from "../step-dots";

export const Step2 = () => {
  const navigate = useNavigate();
  const { setSignupData } = useSignup();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleClick = () => {
    if (emailValid) {
      setSignupData({ email });
      navigate("/signup/step3");
    }
  };

  return (
    <S.SignUpContainer>
      <S.HeaderWrap>
        <img src={logo} />
      </S.HeaderWrap>
      <S.SignupWrap>
        <S.SignupBox>
          <S.SignupBoxElemContainer>
            <S.SignupBoxTitle>
              이메일 입력한 후,
              <br />
              이메일 인증을 진행해주세요
            </S.SignupBoxTitle>

            <div style={{ flex: 1 }}>
              <S.EmailInputWrapper>
                <FiUser size={20} color="#999" />
                <S.EmailInput
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={handleEmailChange}
                />
                <S.SendButton disabled={!emailValid}>
                  <IoIosSend size={20} />
                </S.SendButton>
              </S.EmailInputWrapper>

              <S.HintText>
                인증 메일 발송 버튼을 눌러 인증을 진행해주세요.
              </S.HintText>
            </div>

            <S.NextButtonWrapper>
              <S.NextButton onClick={handleClick} $active={emailValid}>
                다음 →
              </S.NextButton>
            </S.NextButtonWrapper>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <StepDots activeStep={2} />
            </div>
          </S.SignupBoxElemContainer>
        </S.SignupBox>
      </S.SignupWrap>
    </S.SignUpContainer>
  );
};
