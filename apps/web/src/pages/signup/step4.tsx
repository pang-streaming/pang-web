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
import api from "../../api/api"; // 추가

export const Step4 = () => {
  const navigate = useNavigate();
  const { signupData, setSignupData } = useSignup();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordValid = password.length >= 8;
  const isMatch = password === confirmPassword;

  const handleNextClick = async () => {
    if (!isPasswordValid) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (!isMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 상태 저장
    setSignupData({ password });

    try {
      const response = await api.post("/auth/register", {
        email: signupData.email,
        id: signupData.id,
        password,
      });

      alert("회원가입 성공!");
      console.log(`서버 응답 : ${response.data}`)
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패! 다시 시도해주세요.");
    }
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
            <div style={{ flex: 1 }}>
              <EmailInputWrapper>
                <EmailInput
                  type="password"
                  placeholder="비밀번호 (8자 이상)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </EmailInputWrapper>

              <EmailInputWrapper style={{ marginTop: "20px" }}>
                <EmailInput
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </EmailInputWrapper>

              <HintText>
                비밀번호는 최소 8자 이상이며, 두 비밀번호가 일치해야 합니다.
              </HintText>
            </div>

            <NextButtonWrapper>
              <NextButton
                $active={isPasswordValid && isMatch}
                onClick={handleNextClick}
              >
                회원가입 →
              </NextButton>
            </NextButtonWrapper>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <StepDots activeStep={4} />
            </div>
          </SignupBoxElemContainer>
        </SignupBox>
      </SignupWrap>
    </SignUpContainer>
  );
};
