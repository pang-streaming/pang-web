import styled from "styled-components";
import chattingArrow from "../../../../app/assets/chatting-arrow.svg";

export const Container = styled.div`
	width:435px;
	margin: 20px;
	height: 700px;
	display: flex;
	flex-direction: column;
	border-radius: 20px;
	border: 1px solid #404040;
	position: relative;
	background-color: ${({theme}) => theme.colors.background.normal};
`;

export const ChatMessages = styled.div`
margin-top: 50px;
  flex: 1; 
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChattingHeader = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: transparent;
  border-bottom: 1px solid #404040;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChattingArrow = styled.img.attrs({
  src: chattingArrow,
  alt: "뒤로가기",
})`
  position: absolute;
  left: 10px;
  cursor: pointer;
`;

export const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

export const Nickname = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

export const Message = styled.div`
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  align-self: flex-start;
  word-break: break-word;
`;