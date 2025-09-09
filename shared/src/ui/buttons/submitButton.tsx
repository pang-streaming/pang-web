import styled from "styled-components";

interface SubmitButtonProps {
	disabled?: boolean;
	onClick?: () => void;
	text: string;
}

export const SubmitButton = ({disabled = false, onClick, text}: SubmitButtonProps) => {
	return (
		<SubmitButtonContent disabled={disabled} onClick={onClick}>
			{text}
		</SubmitButtonContent>
	)
}

const SubmitButtonContent = styled.button<{disabled: boolean}>`
	border: none;
	padding: 16px 24px;
	width: 444px;
	cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
	background-color: ${({theme, disabled}) => disabled ? theme.colors.button.disabled : theme.colors.primary.normal} ;
	color: ${({theme}) => theme.colors.common.white};
	border-radius: ${({theme}) => theme.borders.large};
	font-size: 16px;
	&:hover {
		background-color: ${({theme, disabled}) => !disabled && theme.colors.hover.normal};
	}
`