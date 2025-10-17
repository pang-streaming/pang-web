import React, { useState } from "react";
import styled from "styled-components";

export const StreamSetting = () => {
  const [sections] = useState<string[]>(["section1", "section2", "section3", "section4"]);

  return (
    <SettingContainer>
      {/* 화면 설정 섹션 */}
      <ScreenSetContainer>
        {sections.map((section) => (
          <ScreenSetSection key={section}>
            <label htmlFor={`screen-select-${section}`}>{section} 화면 설정</label>
          </ScreenSetSection>
        ))}
      </ScreenSetContainer>

      {/* 오디오 설정 섹션 */}
      <AudioSetContainer>
        {sections.map((section) => (
          <AudioSetSection key={section}>
            <label htmlFor={`audio-select-${section}`}>{section} 오디오 설정</label>
          </AudioSetSection>
        ))}
      </AudioSetContainer>

      {/* 볼륨 믹서 */}
      <VolumeMixerContainer>
        <label>볼륨 믹서</label>
      </VolumeMixerContainer>
    </SettingContainer>
  );
};

/* Styled Components */
const SettingContainer = styled.div`
  display: flex;
  flex-direction: row; /* 가로 배치 */
  width: 100%;
  max-width: 1200px;
  border-radius: 14px;
  background-color: #1f1f1f;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  gap: 10px; /* 섹션 간 간격 */
  padding: 16px;
`;

const ScreenSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.7; /* 상대적 넓이 */
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background-color: #2c2c2c;
`;

const ScreenSetSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background-color: #3a3a3a;
  cursor: default;
  border-radius: 6px;

  & > label {
    font-size: 15px;
    color: #fff;
    font-weight: 500;
  }

  &:hover {
    background-color: #4a4a4a;
  }
`;

const AudioSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.7; /* 상대적 넓이 */
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background-color: #2c2c2c;
`;

const AudioSetSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background-color: #3a3a3a;
  cursor: default;
  border-radius: 6px;

  & > label {
    font-size: 15px;
    color: #fff;
    font-weight: 500;
  }

  &:hover {
    background-color: #4a4a4a;
  }
`;

const VolumeMixerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.2; /* 오른쪽 가장 좁게 */
  padding: 16px;
  border-radius: 12px;
  background-color: #2c2c2c;

  & > label {
    font-size: 14px;
    color: #fff;
    font-weight: 500;
  }
`;