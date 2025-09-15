import styled from "styled-components";
import { GenderPicker } from "./gender-section";
import { AgeSection } from "./age-section";
import genderIcon from '@/app/assets/gender.svg';
import calendarIcon from '@/app/assets/calander.svg';
import { NicknameSection } from "./nickname-section";

export const ModalSection = ({
  type,
  birth,
  setBirth,
  gender,
  setGender,
  nickname,
  setNickname
}: {
  type: 'age' | 'gender' | 'nickname';
  birth?: string;
  setBirth?: (value: string) => void;
  gender?: string;
  setGender?: (value: "MALE" | "FEMALE" | "OTHER") => void;
  nickname?: string;
  setNickname?: (value: string) => void;
}) => {
  return (
    <ModalSectionContainer>
      <img src={type == 'age' ? calendarIcon : type == 'gender' ?  genderIcon : ""} />
      <ModalSectionDivider />
      {type == 'age' ? (
        <AgeSection birth={birth || ""} setBirth={setBirth!} />
      ) : (
        type == 'gender' ? ( 
          <GenderPicker gender={gender || ""} setGender={setGender!} />
        ) : <NicknameSection nickname={nickname || ""} setNickname={setNickname!} />
      )
      
      }
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
