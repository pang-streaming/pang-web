import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { SubSection } from "./widget/sub-section";
import { Divider } from "./ui/divider";
import { formattedPrice } from "@/pages/market/util/formatted-price";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import { IoChevronDown } from "react-icons/io5";
import { SubmitButton } from "@pang/shared/ui";
import Buy from "@/app/assets/shopping-cart.svg?react";
import Gift from "@/app/assets/gift.svg?react";
import panglogo from "@/app/assets/pang-emotion-logo.png";
import { useSendGift } from "../../../mypage/widget/settings-menu/widget/gift-list/useGift";
import { useProductDetail } from "@/pages/market/hooks/useProduct";
import { useState } from "react";
import { PurchaseModal } from "./widget/purchase-modal";

export const MarketDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const productId = q.get("productId") ?? "";

  const { data: detail, isLoading } = useProductDetail(productId);
  const { mutate: sendGiftMutate, isPending } = useSendGift();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendGift = () => {
    if (!productId) return;
    const username = prompt("선물을 보낼 사용자의 닉네임을 입력하세요:");
    if (!username) return;

    sendGiftMutate(
      { productId, username },
      {
        onSuccess: () => alert(`✨ ${username}님에게 선물을 보냈어요!`),
        onError: (err: any) => {
          if (err.response?.status === 409) {
            alert("이미 선물을 보낸 유저입니다 😢");
          } else {
            alert("선물 전송 중 오류가 발생했습니다 😢");
          }
        },
      }
    );
  };

  if (isLoading || !detail) {
    return (
      <S.Fallback>
        <p>상품 정보를 불러오는 중...</p>
        <S.BackButton onClick={() => navigate(-1)}>이전으로</S.BackButton>
      </S.Fallback>
    );
  }

  return (
    <S.Container>
      <S.ProductContainerWrap>
        <S.ProductContainer>
          <S.ProductImage src={detail.image || panglogo} />
          <S.ProductInfoSection>
            <S.UserInfoContainer>
              <S.UserAvatar src={detail.profileImage || normalProfile} />
              <S.Username>{detail.username}</S.Username>
            </S.UserInfoContainer>
            <S.ProductTitle>{detail.name}</S.ProductTitle>
            <S.Spacer />

            <SubSection productId={productId} />

            <Divider verticalPadding={20} />
            <S.Price>{formattedPrice(detail.price)}원</S.Price>

            <SubmitButton Icon={Buy} onClick={() => setIsModalOpen(true)}>
              상품 구매하기
            </SubmitButton>
            <SubmitButton
              Icon={Gift}
              type={"alternative"}
              onClick={handleSendGift}
              disabled={isPending}
            >
              {isPending ? "보내는 중..." : "기프트 보내기"}
            </SubmitButton>
          </S.ProductInfoSection>
        </S.ProductContainer>
        <S.DetailButtonContainer
          onClick={() => console.log("상품 상세설명보기")}
        >
          <S.DetailButtonText>상품 상세설명 더보기</S.DetailButtonText>
          <IoChevronDown />
        </S.DetailButtonContainer>
      </S.ProductContainerWrap>
      {isModalOpen && detail && (
        <PurchaseModal
          productName={detail.name}
          price={detail.price}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </S.Container>
  );
};
