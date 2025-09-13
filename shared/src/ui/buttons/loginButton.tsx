import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NormalProfile from "../../asset/logo/normal_profile.svg?react"

interface LoginButtonProps {
	isLoggedIn: boolean;
}

export const LoginButton = ({isLoggedIn}: LoginButtonProps) => {
	const navigate = useNavigate();
	return (
		isLoggedIn ? (
			<LoginButtonContent onClick={() => {navigate("/login")}}>로그인</LoginButtonContent>
		) : (<ProfileImage onClick={() => {navigate("/mypage")}}/>)
	)
}

const LoginButtonContent = styled.button`
	user-select: none;
    border: none;
    cursor: pointer;
	font-size: 16px;
	color: ${({theme}) => theme.colors.common.white};
	background-color: ${({theme}) => theme.colors.primary.normal};
	padding: 6px 19px;
	text-align: center;
	border-radius: ${({theme}) => theme.borders.large};
	line-height: 18px;
	
	&:hover {
		background-color: ${({theme}) => theme.colors.hover.normal};
	}
`

export const ProfileImage = styled(NormalProfile)`
  width: 36px;
  height: 36px;
  border-radius: ${({theme}) => theme.borders.maximum};
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;