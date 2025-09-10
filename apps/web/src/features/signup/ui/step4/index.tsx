import { useState } from "react";
import Logo from "@/app/assets/logo.svg";

import { useNavigate } from "react-router-dom";
import { useSignup } from "../../../auth/model/signup-context";
import api from "../../../../api/api";
import * as S from '@/pages/signup/style';
import { StepDots } from "../step-dots";

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

    setSignupData({ password });

    try {
      const response = await api.post("/auth/register", {
        email: signupData.email,
        id: signupData.id,
        password,
      });

      if (response.data.success === false) {
        alert(`회원가입 실패: ${response.data.message}`);
        return;
      }

      alert("회원가입 성공!");
      navigate("/signup/complete");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패! 다시 시도해주세요.");
    }
  };

  return (
    <S.SignUpContainer>
      <S.HeaderWrap>
        <img src={logo} alt="logo" />
      </S.HeaderWrap>

      <S.SignupWrap>
        <S.SignupBox>
          <S.SignupBoxElemContainer>
            <S.SignupBoxTitle>
              비밀번호를 입력하고
              <br />
              다시 한번 입력해주세요
            </S.SignupBoxTitle>

            <div style={{ flex: 1 }}>
              <S.EmailInputWrapper>
                <S.EmailInput
                  type="password"
                  placeholder="비밀번호 (8자 이상)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </S.EmailInputWrapper>

              <S.EmailInputWrapper style={{ marginTop: "20px" }}>
                <S.EmailInput
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </S.EmailInputWrapper>

              <S.HintText>
                비밀번호는 최소 8자 이상이며, 두 비밀번호가 일치해야 합니다.
              </S.HintText>
            </div>

            <S.NextButtonWrapper>
              <S.NextButton
                $active={isPasswordValid && isMatch}
                onClick={handleNextClick}
              >
                회원가입 →
              </S.NextButton>
            </S.NextButtonWrapper>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <StepDots activeStep={4} />
            </div>
          </S.SignupBoxElemContainer>
        </S.SignupBox>
      </S.SignupWrap>
    </S.SignUpContainer>
  );
};
