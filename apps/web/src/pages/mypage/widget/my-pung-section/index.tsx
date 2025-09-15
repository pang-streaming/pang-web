import React, { useEffect, useState } from "react";
import * as S from "./style";
import { ChargeButton } from "@/pages/charge/ui/charge-button";
import { ChargeModal } from "@/pages/charge/widget/charge-modal";
import styled from "styled-components";
import { fetchMyInfo } from "@/entities/user/api/api";

export const MyPungSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cash, setCash] = useState(0)
  
  
  useEffect(()=> {
    const fetchPung = async () => {
      const result = await fetchMyInfo()
      setCash(result.data.cash)
    }  
    fetchPung()
  },[])

  const handleChargeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <S.Container>
      <S.GradientCircle size={46}>
        <div className="inner">
          <span style={{ fontSize: 24 }}>💣</span>
        </div>
      </S.GradientCircle>
      <S.Title>
        보유 중인 펑 : <S.HighLight>{cash}</S.HighLight> 개
      </S.Title>
      <ChargeButton onClick={handleChargeClick}>충전하기</ChargeButton>
      {isModalOpen && (
        <ModalOverlay>
          <ChargeModal 
            initialType="pung-charge" 
            onClose={handleCloseModal}
          />
        </ModalOverlay>
      )}
    </S.Container>
  );
};



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
