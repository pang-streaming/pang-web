import styled from "styled-components";

export const LoginButton = () => {
	return (
		<LoginButtonContent>
			로그인
		</LoginButtonContent>
	)
}

const LoginButtonContent = styled.button`
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