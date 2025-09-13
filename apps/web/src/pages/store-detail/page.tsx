import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";

import down from "@/app/assets/chevron-down.svg";
import { SubSection } from "./widget/sub-section";
import { Divider } from "./ui/divider";
import { formattedPrice } from "../store/util/formatted-price";
import { IconButton } from "./ui/icon-button";
export const StoreDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | { image: string; name: string; price: number }
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
              <S.UserAvatar />
              <S.Username>Siromori</S.Username>
            </S.UserInfoContainer>
            <S.ProductTitle>{state.name}</S.ProductTitle>
            <S.Spacer />

            <SubSection />
            <Divider color="#404040" verticalPadding={20} />
            <S.Price>{formattedPrice(state.price)}원</S.Price>
            <IconButton type="buy" />
            <IconButton type="gift" />
          </S.ProductInfoSection>
        </S.ProductContainer>
        <S.DetailButtonContainer
          onClick={() => {
            console.log("상품 상세설명보기");
          }}
        >
          <S.DetailButtonText>상품 상세설명 더보기</S.DetailButtonText>
          <S.DetailButtonIcon src={down} alt="" />
        </S.DetailButtonContainer>
      </S.ProductContainerWrap>
    </S.Container>
  );
};
