import styled from "styled-components";

export const StepIndicator = styled.div`
  position: absolute;
  bottom: 20vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const StepCircle = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#F37" : "#404040")};
  transition: background-color 0.3s;
`;

export const SignUpContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

export const HeaderWrap = styled.div`
  width: 100%;
  height: 161px;
  margin: 18px;
`;
export const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignupBox = styled.div`
  width: 490px;
  height: 520px;
  border-radius: 14px;
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
`;

export const SignupBoxElemContainer = styled.div`
  width: 348px;
  height: 403px;
  display: flex;
  flex-direction: column;
`;

export const SignupBoxTitle = styled.span`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%;
  margin-bottom: 50px;
`;

export const SignupBoxAllAccessBox = styled.div`
  width: 100%;
  height: 50px;
  max-width: 348px;
  border-radius: 14px;
  background-color: #262626;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 26px;
`;

export const SignupBoxAllAccessBoxText = styled.span`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.05px;
  margin-left: 9px;
`;

export const SignupBoxDetailAccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-left: -1px;
  margin-bottom: 70px;
`;

export const SignupBoxDetailAccessContainerText = styled.span`
  color: #f37;
  font-family: "Wanted Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  text-decoration-line: underline;
  text-decoration-style: solid;
  margin-left: 9px;
`;

export const EmailInputWrapper = styled.div`
  background-color: #2d2d2d;
  border-radius: 12px;
  padding: 15px 17px;
  display: flex;
  align-items: center;
`;

export const EmailInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  outline: none;
  flex: 1;
  margin-left: 8px;
  font-size: 16px;

  &::placeholder {
    color: #777;
  }
`;

export const SendButton = styled.button<{ disabled: boolean }>`
  background: none;
  border: none;
  color: ${({ disabled }) => (disabled ? "#555" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const HintText = styled.div`
  font-size: 12px;
  color: #aaa;
  margin: 12px 4px 28px 4px;
`;

export const NextButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: -30px;
`;
export const NextButton = styled.button<{ $active: boolean }>`
  width: 348px;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  line-height: 130%;
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  background-color: ${({ $active }) => ($active ? "#FF0055" : "#404040")};
  color: white;
  border: none;
  transition: 0.3s ease;
`;

export const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-left: 40px;
    user-select: none;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;

    &:checked ~ .custom-checkbox {
        background-color: #f37;
        border-color: #f37;
    }

    &:checked ~ .custom-checkbox::after {
        content: "";
        position: absolute;
        left: 5.5px;
        top: 2px;
        width: 6px;
        height: 11px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        border-radius: 1px;
    }
`;


export const CustomCheckbox = styled.span<{ checked?: boolean }>`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background-color: ${({ checked }) => (checked ? "#f37" : "#404040")};
  border-radius: 4px;
  transition: all 0.2s ease;

  &::after {
    content: ${({ checked }) => (checked ? '""' : 'none')};
    position: absolute;
    left: 5.5px;
    top: 2px;
    width: 6px;
    height: 11px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    border-radius: 1px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const CompleteContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  background-color: #171717;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: relative;
`;
export const SuccessMessage = styled.div`
  color: #fff;
  font-family: "Wanted Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%;
`;
