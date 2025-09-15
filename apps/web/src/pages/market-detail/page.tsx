import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { SubSection } from "./widget/sub-section";
import { Divider } from "./ui/divider";
import { formattedPrice } from "@/pages/market/util/formatted-price";
import { IconButton } from "./ui/icon-button";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import {IoChevronDown} from "react-icons/io5";
import {SubmitButton} from "@pang/shared/ui";
import Buy from "@/app/assets/shopping-cart.svg?react";
import Gift from "@/app/assets/gift.svg?react";

export const MarketDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | { image: string; name: string; price: number; seller: string; }
    | undefined;

  if (!state) {
    return (
      <S.Fallback>
        <p>상품 정보를 찾을 수 없습니다.</p>
        <S.BackButton onClick={() => navigate(-1)}>이전으로</S.BackButton>
      </S.Fallback>
    );
  }

  return (
    <S.Container>
      <S.ProductContainerWrap>
        <S.ProductContainer>
          <S.ProductImage src={state.image} />
          <S.ProductInfoSection>
            <S.UserInfoContainer>
              <S.UserAvatar src={normalProfile} />
              <S.Username>{state.seller}</S.Username>
            </S.UserInfoContainer>
            <S.ProductTitle>{state.name}</S.ProductTitle>
            <S.Spacer />
            <SubSection />
            <Divider verticalPadding={20} />
            <S.Price>{formattedPrice(state.price)}원</S.Price>
	          <SubmitButton Icon={Buy}>상품 구매하기</SubmitButton>
	          <SubmitButton Icon={Gift} type={'alternative'}>기프트 보내기</SubmitButton>
          </S.ProductInfoSection>
        </S.ProductContainer>
        <S.DetailButtonContainer onClick={() => {console.log("상품 상세설명보기");}}>
          <S.DetailButtonText>상품 상세설명 더보기</S.DetailButtonText>
	        <IoChevronDown />
        </S.DetailButtonContainer>
      </S.ProductContainerWrap>
    </S.Container>
  );
};
