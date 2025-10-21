import styled from "styled-components";
import {SubmitButton} from "../buttons/submitButton";
import {IoClose} from "react-icons/io5";

interface LoginModalProps {
	onCancel: () => void;
	onConfirm: () => void;
}

export const LoginModal = ({onCancel, onConfirm}: LoginModalProps) => {
	return (
		<ModalOverlay>
			<ModalContent>
				<ModalCloseIconWrapper>
					<CloseIcon size={28} onClick={onCancel} />
				</ModalCloseIconWrapper>
			<InfoTitle>로그인이 필요한 페이지입니다.</InfoTitle>
			<InfoDescription>해당 페이지를 이용하시려면 로그인이 필요합니다.</InfoDescription>
			<ButtonGroup>
				<SubmitButton onClick={onCancel} type="alternative">취소</SubmitButton>
				<SubmitButton onClick={onConfirm}>로그인하기</SubmitButton>
			</ButtonGroup>
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

const InfoDescription = styled.p`
  font-size: ${({theme}) => theme.font.medium};
  color: ${({theme}) => theme.colors.text.subtitle};
  padding-bottom: 30px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
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