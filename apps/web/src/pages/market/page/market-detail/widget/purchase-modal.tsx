import React, { useState } from "react";
import { SubmitButton } from "@pang/shared/ui";
import styled from "styled-components";

declare global {
  interface Window {
    daum: any;
  }
}

interface PurchaseModalProps {
  productName: string;
  price: number;
  onClose: () => void;
}

export const PurchaseModal = ({ productName, price, onClose }: PurchaseModalProps) => {
  const [address, setAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpenPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setAddress(`${data.roadAddress} ${data.buildingName || ""}`);
      },
    }).open();
  };

  const handlePurchase = () => {
    if (!recipient || !phone || !address) {
      alert("배송 정보를 모두 입력해주세요!");
      return;
    }
    alert(`🎉 ${productName} 결제 완료! 배송지: ${address}`);
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <Title>상품 구매</Title>
        <Label>수령인</Label>
        <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        <Label>연락처</Label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Label>배송지</Label>
        <AddressInputWrapper>
          <Input value={address} readOnly />
          <SubmitButton onClick={handleOpenPostcode}>주소 검색</SubmitButton>
        </AddressInputWrapper>
        <SubmitButton onClick={handlePurchase}>
          {productName} {price.toLocaleString()}원 결제
        </SubmitButton>
        <CancelButton onClick={onClose}>취소</CancelButton>
      </ModalContainer>
    </Overlay>
  );
};


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const ModalContainer = styled.div`
  width: 400px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: bold;
  color: ${({theme})=>theme.colors.text.normal};
`;
const Label = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({theme})=>theme.colors.text.normal};

`;
const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: ${({theme}) => theme.colors.background.normal};
  color: ${({theme}) => theme.colors.text.normal};
  outline: none;
  width: 100%;
`;
const AddressInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const CancelButton = styled.button`
  margin-top: 8px;
  background: #ccc;
  padding: 8px;
  border-radius: 6px;
  font-weight: bold;
`;
