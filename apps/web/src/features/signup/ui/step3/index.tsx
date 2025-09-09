import * as S from '../../../../pages/signup/style';
import logo from "../../../../app/assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdCheck } from "react-icons/md";

import { useSignup } from '../../../auth/model/signup-context';
import { StepDots } from '../step-dots';


export const Step3 = () => {
  const navigate = useNavigate();
  const { setSignupData } = useSignup();

  const [id, setId] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleDuplicateCheck = () => {
    if (id.length >= 4) setIsChecked(true);
    else {
      alert("아이디는 최소 4자 이상이어야 합니다.");
      setIsChecked(false);
    }
  };

  const handleNextClick = () => {
    if (isChecked) {
      setSignupData({ id });
      navigate("/signup/step4");
    } else {
      alert("아이디 중복 체크를 완료해주세요.");
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
              아이디 입력 후,
              <br />
              아이디 중복 체크를 진행해주세요
            </S.SignupBoxTitle>

            <div style={{ flex: 1 }}>
              <S.EmailInputWrapper>
                <FiUser size={20} color="#999" />
                <S.EmailInput
                  placeholder="아이디를 입력해주세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <S.SendButton disabled={!id} onClick={handleDuplicateCheck}>
                  <MdCheck size={24} />
                </S.SendButton>
              </S.EmailInputWrapper>

              <S.HintText>
                아이디 중복 체크 버튼을 눌러 중복 체크를 진행해주세요.
              </S.HintText>
            </div>

            <S.NextButtonWrapper>
              <S.NextButton onClick={handleNextClick} $active={isChecked}>
                다음 →
              </S.NextButton>
            </S.NextButtonWrapper>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <StepDots activeStep={3} />
            </div>
          </S.SignupBoxElemContainer>
        </S.SignupBox>
      </S.SignupWrap>
    </S.SignUpContainer>
  );
};
