import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const ProductContainerWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
	align-items: center;
`;

export const ProductContainer = styled.div`
	width: 100%;
  padding: 20px 120px;
  display: flex;
  box-sizing: border-box;
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ProductInfoSection = styled.div`
  padding: 0 50px;
	width: 100%;
  height: 400px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
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
  color: ${({theme}) => theme.colors.text.normal};
  cursor: pointer;
`;

export const Fallback = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({theme}) => theme.colors.text.normal};
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

export const UserAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: ${({theme}) => theme.borders.maximum};
  background-color: ${({theme}) => theme.colors.background.dark};
`;

export const Username = styled.span`
  font-size: ${({theme}) => theme.font.xLarge};
	font-weight: 600;
  color: ${({theme}) => theme.colors.text.normal};
`;

export const ProductTitle = styled.span`
  font-size: ${({theme}) => theme.font.xxLarge};
  font-weight: 700;
  color: ${({theme}) => theme.colors.text.normal};
`;

export const Spacer = styled.div`
  height: 10px;
`;

export const DetailButtonContainer = styled.div`
  display: flex;
	flex-direction: row;
	justify-content: center;
  margin-bottom: 20px;
  gap: 3px;
  cursor: pointer;
  color: ${({theme}) => theme.colors.text.normal};
	width: fit-content;
	padding: 8px 12px;
	border-radius: ${({theme}) => theme.borders.medium};
	&:hover {
			background-color: ${({theme}) => theme.colors.hover.light};
	}
`;

export const DetailButtonText = styled.span`
  font-size: ${({theme}) => theme.font.medium};
  font-weight: 500;
	user-select: none;
`;

export const Description = styled.span`
  width: 100%;
  background-color: red;
  align-self: center;
  padding: 20px 120px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.normal};
  white-space: pre-wrap;
`;