import { TabTitleText } from "@/shared/ui/tab-title-text";
import styled from "styled-components";
import { useGifts, useUpdateGiftInfo } from "./useGift";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { useState } from "react";
import { Gift, DeliveryStatus } from "@/features/gift/model/type";
import panglogo from "@/app/assets/pang-emotion-logo.png";
import { formattedPrice } from "@/pages/market/util/formatted-price";

export const GiftList = () => {
  const { data, isLoading, isError } = useGifts();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div>
        <TabTitleText>내가 받은 선물</TabTitleText>
        <SkeletonGrid count={3} minWidth={200} itemHeight={220} />
      </div>
    );
  }

  if (isError) return <div>선물 정보를 불러오지 못했습니다.</div>;

  const gifts = data?.data || [];

  const handleGiftClick = (gift: Gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGift(null);
  };

  return (
    <Container>
      <TabTitleText>내가 받은 선물</TabTitleText>
      {gifts.length === 0 ? (
        <EmptyVideoTitle>받은 선물이 없습니다.</EmptyVideoTitle>
      ) : (
        <GiftGrid>
          {gifts.map((gift) => (
            <GiftCard
              key={gift.purchaseId}
              onClick={() => handleGiftClick(gift)}
            >
              <GiftImage
                src={gift.imageUrl || panglogo}
                alt={gift.productName}
              />
              <ProductName>{gift.productName}</ProductName>
              <Price>{formattedPrice(gift.price)}원</Price>
              <DeliveryBadge status={gift.deliveryStatus}>
                {getDeliveryStatusText(gift.deliveryStatus)}
              </DeliveryBadge>
            </GiftCard>
          ))}
        </GiftGrid>
      )}
      {isModalOpen && selectedGift && (
        <GiftInfoModal gift={selectedGift} onClose={handleCloseModal} />
      )}
    </Container>
  );
};

const getDeliveryStatusText = (status: DeliveryStatus) => {
  switch (status) {
    case "PREPARING":
      return "준비중";
    case "SHIPPING":
      return "배송중";
    case "DELIVERED":
      return "배송완료";
    default:
      return status;
  }
};

// Styled Components (컴포넌트 위에 정의)
const AddressButton = styled.button`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borders.medium};
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }
`;

interface GiftInfoModalProps {
  gift: Gift;
  onClose: () => void;
}

const GiftInfoModal = ({ gift, onClose }: GiftInfoModalProps) => {
  const [address, setAddress] = useState(gift.address || "");
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>(
    gift.deliveryStatus
  );
  const updateGiftMutation = useUpdateGiftInfo();

  console.log("🎁 GiftInfoModal - gift 정보:", {
    purchaseId: gift.purchaseId,
    productId: gift.productId,
    address: gift.address,
    deliveryStatus: gift.deliveryStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("✅ handleSubmit 호출 - 전달할 데이터:", {
      purchaseId: gift.purchaseId,
      address,
      deliveryStatus,
    });

    updateGiftMutation.mutate(
      {
        purchaseId: gift.purchaseId,
        address,
        deliveryStatus,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };
  const handleOpenPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setAddress(`${data.roadAddress} ${data.buildingName || ""}`);
      },
    }).open();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>선물 정보 관리</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <GiftInfo>
            <GiftImage src={gift.imageUrl || panglogo} alt={gift.productName} />
            <GiftDetails>
              <ProductNameLarge>{gift.productName}</ProductNameLarge>
              <PriceLarge>{formattedPrice(gift.price)}원</PriceLarge>
              <InfoRow>
                <InfoLabel>보낸 사람:</InfoLabel>
                <InfoValue>{gift.buyerName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>받은 날짜:</InfoLabel>
                <InfoValue>
                  {new Date(gift.createdAt).toLocaleDateString()}
                </InfoValue>
              </InfoRow>
            </GiftDetails>
          </GiftInfo>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>배송 주소</Label>
              <div style={{ display: "flex", gap: 10 }}>
                <Input value={address} readOnly />

                <AddressButton type="button" onClick={handleOpenPostcode}>
                  주소 검색
                </AddressButton>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>배송 상태</Label>
              <Select
                value={deliveryStatus}
                onChange={(e) =>
                  setDeliveryStatus(e.target.value as DeliveryStatus)
                }
              >
                <option value="PREPARING">준비중</option>
                <option value="SHIPPING">배송중</option>
                <option value="DELIVERED">배송완료</option>
              </Select>
            </FormGroup>
            <ButtonGroup>
              <CancelButton type="button" onClick={onClose}>
                취소
              </CancelButton>
              <SubmitButton
                type="submit"
                disabled={updateGiftMutation.isPending}
              >
                {updateGiftMutation.isPending ? "저장중..." : "저장"}
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const EmptyVideoTitle = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const GiftGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const GiftCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const GiftImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borders.large};
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductName = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.normal};
  margin-bottom: 8px;
`;

const DeliveryBadge = styled.span<{ status: DeliveryStatus }>`
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 500;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ status, theme }) =>
    status === "DELIVERED"
      ? "#4caf50"
      : status === "SHIPPING"
        ? theme.colors.primary.normal
        : theme.colors.secondary.normal};
  color: ${({ theme }) => theme.colors.common.white};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.subtitle};
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text.normal};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const GiftInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
`;

const GiftDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const ProductNameLarge = styled.h3`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const PriceLarge = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.normal};
`;

const InfoRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const Input = styled.input`
  flex: 1;
  margin-right: auto;
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.font.medium};
  border: 1px solid #e0e0e0;
  border-radius: ${({ theme }) => theme.borders.medium};
  background-color: ${({ theme }) => theme.colors.background.normal};
  color: ${({ theme }) => theme.colors.text.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.font.medium};
  border: 1px solid #e0e0e0;
  border-radius: ${({ theme }) => theme.borders.medium};
  background-color: ${({ theme }) => theme.colors.background.normal};
  color: ${({ theme }) => theme.colors.text.normal};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  border: 1px solid #e0e0e0;
  border-radius: ${({ theme }) => theme.borders.medium};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borders.medium};
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
