import styled from "styled-components";
import {SubmitButton} from "../buttons/submitButton";
import {IoClose} from "react-icons/io5";

export const LoginModal = () => {
	return (
		<ModalOverlay>
			<ModalContent>
				<ModalCloseIconWrapper>
					<CloseIcon size={28} onClick={() => console.log("asdds")} />
				</ModalCloseIconWrapper>
				<InfoTitle>Login</InfoTitle>
				<SubmitButton onClick={() => console.log("asdds")}>로그인하기</SubmitButton>
			</ModalContent>
		</ModalOverlay>
	)
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
`

const CloseIcon = styled(IoClose)`
    cursor: pointer;
		color: ${({theme}) => theme.colors.text.normal};
`;

const ModalCloseIconWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
`

const InfoTitle = styled.span`
	font-size: ${({theme}) => theme.font.xxLarge};
	font-weight: bold;
	color: ${({theme}) => theme.colors.text.normal};
	padding-bottom: 20px;
`;

const ModalContent = styled.div`
  background: ${({theme}) => theme.colors.background.dark};
  box-sizing: border-box;
  padding: 20px;
  border-radius: 14px;
  width: 490px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;