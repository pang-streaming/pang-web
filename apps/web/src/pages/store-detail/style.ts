import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const ProductContainerWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 12px;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

export const ProductContainer = styled.div`
  gap: 85px;
  padding: 25px 111px;
  height: 486px;
  flex: 1;
  display: flex;

  @media (max-width: 1024px) {
    gap: 40px;
    padding: 24px 48px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    height: auto;
  }
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 1024px) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-height: 260px;
    border-radius: 8px;
  }
`;

export const ProductInfoSection = styled.div`
  flex: 1;
  padding: 0 100px;
  height: 400px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
    height: auto;
  }
`;

export const Price = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 20px;
  align-self: flex-end;

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-bottom: 12px;
    font-size: 18px;
  }
`;

export const BackButton = styled.button`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: #2a2a2a;
  color: #ffffff;
  cursor: pointer;
`;

export const Fallback = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #ffffff;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

export const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
`;

export const Username = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text.normal};
`;

export const ProductTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text.normal};
`;

export const Spacer = styled.div`
  height: 10px;
`;

export const DetailButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  cursor: pointer;
`;

export const DetailButtonText = styled.span`
  color: #d4d4d4;
  font-size: 12px;
  font-weight: 400;
`;

export const DetailButtonIcon = styled.img`
`;
