import styled from "styled-components";
import charge from "@/app/assets/images/charge.svg";
import { ChargeButton } from "../../ui/charge-button";
import { ChargeModal } from "../charge-modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@/entities/user/api/api";

interface ChargeBoxProps {
  type: "mypung" | "autochargepung";
}

export const ChargeBox = ({ type }: ChargeBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
  const cash = data?.data?.cash ?? 0;

  const handleChargeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        {type === "mypung" ? (
          <StrokeCircle>
            <span style={{ fontSize: 32 }}>💣</span>
          </StrokeCircle>
        ) : (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: 20,
            }}
          >
            <img src={charge} />
            <span
              style={{
                position: "absolute",
                top: "47%",
                left: "50%",
                fontSize: 32,
                transform: "translate(-50%, -50%)",
              }}
            >
              💣
            </span>
          </div>
        )}

        <Text>
          {type === "mypung" ? (
            <>
              보유중인 펑 : <Amount>{cash.toLocaleString()}</Amount>개
            </>
          ) : (
            "펑 자동충전"
          )}
        </Text>

        <ChargeButton onClick={handleChargeClick}>충전하기</ChargeButton>
      </Container>

      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ChargeModal 
            initialType={type === "mypung" ? "pung-charge" : "auto-charge"} 
            chargeType={type}
            onClose={handleCloseModal} 
          />
        </ModalOverlay>
      )}
    </>
  );
};

const Container = styled.div`
  flex: 1;
  height: 80px;
  border-radius: 8px;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;
const StrokeCircle = styled.div`
  width: 45px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-right: auto;
`;
const Amount = styled.span`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.normal};
`;

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
