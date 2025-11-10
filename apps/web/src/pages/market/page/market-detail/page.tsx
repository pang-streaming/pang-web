import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { Divider } from "./ui/divider";
import { formattedPrice } from "@/pages/market/util/formatted-price";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import {
  IoChevronDown,
  IoHeart,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { IconButton, SubmitButton } from "@pang/shared/ui";
import Buy from "@/app/assets/shopping-cart.svg?react";
import Gift from "@/app/assets/gift.svg?react";
import { IoDownloadOutline } from "react-icons/io5";
import panglogo from "@/app/assets/pang-emotion-logo.png";
import { useSendGift } from "@/features/gift/hook/useGift";
import {
  useLikeProduct,
  useProductDetail,
  useTopFiveProduct,
} from "@/features/market/hooks/useProduct";
import { useState } from "react";
import { PurchaseModal } from "./widget/purchase-modal";
import { SkeletonBox, VirtualModelElemSkeleton } from "@/shared/ui/skeleton";
import { VirtualModelElem } from "../../widget/market-section/widget/virtual-model-section/components/virtual-model-elem";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import styled, { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@/entities/user/api";
import { useMyFollowing } from "@/features/follow/hooks/useFollow";

export const MarketDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const productId = q.get("productId") ?? "";

  const { data: detail, isLoading } = useProductDetail(productId);
  const { data: topFive, isLoading: topFiveLoading } = useTopFiveProduct();
  const { mutate: sendGiftMutate, isPending } = useSendGift();
  const { mutate: likeMutate, isPending: isLikePending } = useLikeProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const { data: myInfo } = useQuery({ queryKey: ["myInfo"], queryFn: fetchMyInfo });
  const { data: followingData, isLoading: followingLoading } = useMyFollowing(myInfo?.data?.username);
  const theme = useTheme();


  const handleSendGift = () => {
    if (!productId) return;
    setIsFollowModalOpen(true);
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert("상품 링크가 클립보드에 복사되었어요!");
    } catch (err) {
      alert("복사 중 오류가 발생했어요 😢");
    }
  };

  const handleLike = () => {
    if (detail && !isLikePending) {
      likeMutate({ productId });
    }
  };

  const handleDownload = () => {
    if (!detail?.fileUrl) {
      alert("다운로드할 파일이 없습니다.");
      return;
    }
    
    try {
      const link = document.createElement('a');
      link.href = detail.fileUrl;
      link.download = detail.name || 'download';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert("파일 다운로드를 시작합니다!");
    } catch (err) {
      console.error("다운로드 실패:", err);
      alert("다운로드 중 오류가 발생했습니다.");
    }
  };

  if (isLoading || topFiveLoading || !detail) {
    return (
      <S.Container>
        <S.ProductContainerWrap>
          <S.ProductContainer>
            <SkeletonBox width={650} height={400} />
            <S.ProductInfoSection>
              <S.UserInfoContainer>
                <SkeletonBox width={45} height={45} radius={999} />
              </S.UserInfoContainer>
              <S.Spacer />
              <div style={{ width: "100%", display: "flex" }}>
                <S.LikeButton onClick={handleLike} disabled={isLikePending}>
                  {detail?.isLiked ? (
                    <IoHeart size={20} color="#ff4757" />
                  ) : (
                    <span>dd</span>
                  )}
                  <span>{detail?.likes}</span>
                </S.LikeButton>
                <IconButton Icon={IoShareSocialOutline} onClick={handleShare} />
              </div>
              <Divider verticalPadding={20} />
              <SkeletonBox width={120} height={25} />

              <SkeletonBox width={'100%'} height={48} radius={8} />
              <SkeletonBox width={'100%'} height={48} radius={8} />
            </S.ProductInfoSection>
          </S.ProductContainer>
          <S.DetailButtonContainer>
            
            <S.DetailButtonText>상품 상세설명 더보기</S.DetailButtonText>
            <IoChevronDown />
          </S.DetailButtonContainer>
        </S.ProductContainerWrap>

        <S.TopFiveSection>
          <TabTitleText>이런 상품은 어때요?</TabTitleText>
          <S.TopFiveContainer>
            <VirtualModelElemSkeleton />
            <VirtualModelElemSkeleton />
            <VirtualModelElemSkeleton />
          </S.TopFiveContainer>
        </S.TopFiveSection>
      </S.Container>
    );
  }

  const handleMarket = (storeId: string) => {
    navigate(`/store-detail/${storeId}`);
  };

  const handleSelectReceiver = (username: string) => {
    if (!productId) return;
    sendGiftMutate(
      { productId, username },
      {
        onSuccess: () => {
          setIsFollowModalOpen(false);
        },
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

  return (
    <S.Container>
      <S.ProductContainerWrap>
        <S.ProductContainer>
          <S.ProductImage src={detail.image || panglogo} />
          <S.ProductInfoSection>
            <S.UserInfoContainer>
              <S.UserAvatar
                onClick={() => {
                  handleMarket(detail.storeId);
                }}
                src={detail.profileImage || normalProfile}
              />
              <S.Username>{detail.username}</S.Username>
            </S.UserInfoContainer>
            <S.ProductTitle>{detail.name}</S.ProductTitle>
            <S.Spacer />
            <div style={{ width: "100%", display: "flex" }}>
              <S.LikeButton onClick={handleLike} disabled={isLikePending}>
                {detail.isLiked ? (
                  <IoHeart size={20} color="#ff4757" />
                ) : (
                  <IoHeartOutline size={20} color={theme.colors.text.normal} />

                )}
                <S.LikeText>{detail.likes}</S.LikeText>
              </S.LikeButton>
              <IconButton Icon={IoShareSocialOutline} onClick={handleShare} />
            </div>
            <Divider verticalPadding={20} />
            <S.Price>{formattedPrice(detail.price)}원</S.Price>

            {detail.isPurchased ? (
              <>
                <SubmitButton Icon={IoDownloadOutline} onClick={handleDownload}>
                  파일 저장하기
                </SubmitButton>
                <PurchasedBadge>✓ 구매 완료</PurchasedBadge>
              </>
            ) : (
              <>
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
              </>
            )}
          </S.ProductInfoSection>
        </S.ProductContainer>
        
        {detail.description && (
          <>
            <S.DetailButtonContainer
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <S.DetailButtonText>상품 상세설명 {isDescriptionOpen ? "접기" : "더보기"}</S.DetailButtonText>
              <IoChevronDown style={{ transform: isDescriptionOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
            </S.DetailButtonContainer>
            
            {isDescriptionOpen && (
              <S.DescriptionSection>
                <S.DescriptionText>{detail.description}</S.DescriptionText>
              </S.DescriptionSection>
            )}
          </>
        )}
      </S.ProductContainerWrap>
      {isModalOpen && detail && (
        <PurchaseModal
          productId={productId}
          productName={detail.name}
          price={detail.price}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isFollowModalOpen && (
        <FollowModalOverlay onClick={() => setIsFollowModalOpen(false)}>
          <FollowModalContent onClick={(e) => e.stopPropagation()}>
            <FollowModalHeader>
              <FollowModalTitle>선물 보낼 사용자 선택</FollowModalTitle>
              <FollowModalClose onClick={() => setIsFollowModalOpen(false)}>×</FollowModalClose>
            </FollowModalHeader>
            <FollowModalBody>
              {followingLoading ? (
                <div>팔로잉 목록을 불러오는 중...</div>
              ) : (
                <FollowList>
                  {(followingData?.data || []).map((u) => (
                    <FollowItem key={u.username} onClick={() => handleSelectReceiver(u.username)}>
                      <FollowAvatar src={u.image || normalProfile} />
                      <FollowName>{u.nickname}</FollowName>
                      <FollowUsername>@{u.username}</FollowUsername>
                    </FollowItem>
                  ))}
                </FollowList>
              )}
            </FollowModalBody>
          </FollowModalContent>
        </FollowModalOverlay>
      )}

      <S.TopFiveSection>
        <TabTitleText>이런 상품은 어때요?</TabTitleText>
        {topFiveLoading || isLoading || !detail ? (
          <S.TopFiveContainer>
            <VirtualModelElemSkeleton />
            <VirtualModelElemSkeleton />
            <VirtualModelElemSkeleton />
          </S.TopFiveContainer>
        ) : (
          <S.TopFiveContainer>
            {topFive?.map((top) => (
              <VirtualModelElem
                id={top.id}
                image={top.image}
                price={top.price}
                productName={top.name}
              />
            ))}
          </S.TopFiveContainer>
        )}
      </S.TopFiveSection>
    </S.Container>
  );
};

const FollowModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const FollowModalContent = styled.div`
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  background: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const FollowModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const FollowModalTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.normal};
`;

const FollowModalClose = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 28px;
  cursor: pointer;
`;

const FollowModalBody = styled.div`
  padding: 12px 8px 16px 8px;
  max-height: 60vh;
  overflow-y: auto;
`;

const FollowList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.hover.light};
  }
`;

const FollowAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const FollowName = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: 600;
`;

const FollowUsername = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const PurchasedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.primary.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.colors.primary.normal};
`;

