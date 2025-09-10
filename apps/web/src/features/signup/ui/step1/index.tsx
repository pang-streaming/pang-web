
import * as S from '@/pages/signup/style';
import Logo from "@/app/assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { StepDots } from '../step-dots';


export const Step1 = () => {
  const navigate = useNavigate();

  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  useEffect(() => {
    setAllChecked(termsChecked && privacyChecked);
  }, [termsChecked, privacyChecked]);

  const handleAllCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setTermsChecked(checked);
    setPrivacyChecked(checked);
  };

  const handleClick = () => {
    if (termsChecked && privacyChecked) {
      navigate("/signup/step2");
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
              PANG 서비스 약관에
              <br />
              동의해주세요.
            </S.SignupBoxTitle>

            <div style={{ flex: 1 }}>
              {/* 전체 동의 */}
              <S.SignupBoxAllAccessBox>
                <S.CheckboxLabel>
                  <S.Checkbox
                    checked={allChecked}
                    onChange={handleAllCheckedChange}
                  />
                  <S.CustomCheckbox checked={allChecked} />

                  <S.SignupBoxAllAccessBoxText>약관 전체 동의</S.SignupBoxAllAccessBoxText>
                </S.CheckboxLabel>
              </S.SignupBoxAllAccessBox>

              {/* 세부 동의 */}
              <S.SignupBoxDetailAccessContainer>
                <div>
                  <S.CheckboxLabel>
                    <S.Checkbox
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                    />
                    <S.CustomCheckbox checked={termsChecked} />

                    <S.SignupBoxDetailAccessContainerText>
                      서비스 이용 약관에 동의
                    </S.SignupBoxDetailAccessContainerText>
                  </S.CheckboxLabel>
                </div>
                <div>
                  <S.CheckboxLabel>
                    <S.Checkbox
                      checked={privacyChecked}
                      onChange={(e) => setPrivacyChecked(e.target.checked)}
                    />
                    <S.CustomCheckbox checked={privacyChecked} />

                    <S.SignupBoxDetailAccessContainerText>
                      개인정보 수집 및 이용에 동의
                    </S.SignupBoxDetailAccessContainerText>
                  </S.CheckboxLabel>
                </div>
              </S.SignupBoxDetailAccessContainer>
            </div>

            <S.NextButtonWrapper>
              <S.NextButton onClick={handleClick} $active={termsChecked && privacyChecked}>
                다음 →
              </S.NextButton>
            </S.NextButtonWrapper>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <StepDots activeStep={1} />
            </div>
          </S.SignupBoxElemContainer>
        </S.SignupBox>
      </S.SignupWrap>
    </S.SignUpContainer>
  );
};