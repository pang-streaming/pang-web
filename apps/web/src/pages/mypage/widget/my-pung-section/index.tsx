import React from "react";
import * as S from "./style";
import { ChargeButton } from "@/pages/charge/ui/charge-button";

export const MyPungSection = () => {
  const mypung = 300;
  return (
    <S.Container>
      <S.GradientCircle size={46}>
        <div className="inner">
          <span style={{ fontSize: 24 }}>💣</span>
        </div>
      </S.GradientCircle>
      <S.Title>
        보유 중인 펑 : <S.HighLight>{mypung}</S.HighLight> 개
      </S.Title>
      <ChargeButton onClick={() => {}}>충전하기</ChargeButton>
    </S.Container>
  );
};
