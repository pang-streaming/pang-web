import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeaderWrap,
  NextButtonWrapper,
  NextButton,
  SignupBox,
  SignupBoxElemContainer,
  SignupWrap,
  SignUpContainer,
  SignupBoxTitle,
  EmailInputWrapper,
  EmailInput,
  HintText,
} from "../signup.style";
import { StepDots } from "./stepDots";
import logo from "../../assets/logo.svg";
import { useSignup } from "./signup-context";

export const Step4 = () => {
  const navigate = useNavigate();
  const { setSignupData } = useSignup(); 

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordValid = password.length >= 8;
  const isMatch = password === confirmPassword;

  const handleNextClick = () => {
    if (!isPasswordValid) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (!isMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setSignupData({ password });
    navigate("/signup/complete");
  };

  return (
    <SignUpContainer>
      <HeaderWrap>
        <img src={logo} alt="logo" />
      </HeaderWrap>

      <SignupWrap>
        <SignupBox>
          <SignupBoxElemContainer>
            <SignupBoxTitle>
              비밀번호를 입력하고
              <br />
              다시 한번 입력해주세요
            </SignupBoxTitle>
            {/* 중간 컨텐츠 영역 */}
            <div style={{ flex: 1 }}>
              {/* 비밀번호 입력 */}
              <EmailInputWrapper>
                {/*<FiLock size={20} color="#999" />*/}
                <EmailInput
                  type="password"
                  placeholder="비밀번호 (8자 이상)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </EmailInputWrapper>

              {/* 비밀번호 확인 */}
              <EmailInputWrapper style={{ marginTop: "20px" }}>
                {/*<FiLock size={20} color="#999" />*/}
                <EmailInput
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </EmailInputWrapper>

              {/* 힌트 */}
              <HintText>
                비밀번호는 최소 8자 이상이며, 두 비밀번호가 일치해야 합니다.
              </HintText>
            </div>

            {/* 다음 버튼 */}
            <NextButtonWrapper>
              <NextButton
                $active={isPasswordValid && isMatch}
                onClick={handleNextClick}
              >
                회원가입 →
              </NextButton>
            </NextButtonWrapper>

            {/* 인디케이터 */}
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <StepDots activeStep={4} />
            </div>
          </SignupBoxElemContainer>
        </SignupBox>
      </SignupWrap>
    </SignUpContainer>
  );
};
