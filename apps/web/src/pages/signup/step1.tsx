import * as S from "../signup.style";

import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { StepDots } from "./stepDots";

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
            {/* 고정 제목 */}
            <S.SignupBoxTitle>
              PANG 서비스 약관에
              <br />
              동의해주세요.
            </S.SignupBoxTitle>

            {/* 중간 컨텐츠 */}
            <div style={{ flex: 1 }}>
              <S.SignupBoxAllAccessBox>
                <S.CheckboxLabel>
                  <S.Checkbox
                    id="all-access-checkbox"
                    checked={allChecked}
                    onChange={handleAllCheckedChange}
                  />
                  <S.CustomCheckbox className="custom-checkbox" />
                  <S.SignupBoxAllAccessBoxText>
                    약관 전체 동의
                  </S.SignupBoxAllAccessBoxText>
                </S.CheckboxLabel>
              </S.SignupBoxAllAccessBox>

              <S.SignupBoxDetailAccessContainer>
                <div>
                  <S.CheckboxLabel>
                    <S.Checkbox
                      id="terms-checkbox"
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                    />
                    <S.CustomCheckbox className="custom-checkbox" />
                    <S.SignupBoxDetailAccessContainerText>
                      서비스 이용 약관에 동의
                    </S.SignupBoxDetailAccessContainerText>
                  </S.CheckboxLabel>
                </div>
                <div>
                  <S.CheckboxLabel>
                    <S.Checkbox
                      id="privacy-checkbox"
                      checked={privacyChecked}
                      onChange={(e) => setPrivacyChecked(e.target.checked)}
                    />
                    <S.CustomCheckbox className="custom-checkbox" />
                    <S.SignupBoxDetailAccessContainerText>
                      개인정보 수집 및 이용에 동의
                    </S.SignupBoxDetailAccessContainerText>
                  </S.CheckboxLabel>
                </div>
              </S.SignupBoxDetailAccessContainer>
            </div>

            {/* 고정 버튼 */}
            <S.NextButtonWrapper>
              <S.NextButton
                onClick={handleClick}
                disabled={!(termsChecked && privacyChecked)}
                $active={termsChecked && privacyChecked}
              >
                다음 →
              </S.NextButton>
            </S.NextButtonWrapper>

            {/* 고정 인디케이터 */}
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <StepDots activeStep={1} />
            </div>
          </S.SignupBoxElemContainer>
        </S.SignupBox>
      </S.SignupWrap>
    </S.SignUpContainer>
  );
};