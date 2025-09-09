import styled from "styled-components";
import Calander from "../../../../assets/loginIcon/calander.svg";
import Gender from "../../../../assets/loginIcon/gender.svg";
import { GenderPicker } from "./gender-section";
import { AgeSection } from "./age-section";

export const ModalSection = ({
  isAge,
  birth,
  setBirth,
  gender,
  setGender,
}: {
  isAge: boolean;
  birth?: string;
  setBirth?: (value: string) => void;
  gender?: string;
  setGender?: (value: "MALE" | "FEMALE" | "OTHER") => void;
}) => {
  return (
    <ModalSectionContainer>
      <img src={isAge ? Calander : Gender} />
      <ModalSectionDivider />
      {isAge ? (
        <AgeSection birth={birth || ""} setBirth={setBirth!} />
      ) : (
        <GenderPicker gender={gender || ""} setGender={setGender!} />
      )}
    </ModalSectionContainer>
  );
};

const ModalSectionContainer = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background-color: #262626;
  box-sizing: border-box;
  padding: 15px 18px;
  display: flex;
  align-items: center;
`;

const ModalSectionDivider = styled.div`
  width: 1px;
  height: 90%;
  background-color: #737373;
  margin-left: 18px;
  margin-right: 22px;
`;
