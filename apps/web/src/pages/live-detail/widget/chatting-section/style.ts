import styled from "styled-components";

export const ChattingContainer = styled.div`
	right: 0;
	margin-right: 15px;
	box-sizing: border-box;
  padding: 20px;
	width:435px;
	min-height: 700px;
	max-height: calc(100vh - 4em - 67px);
	display: flex;
	flex-direction: column;
	border-radius: ${({theme}) => theme.borders.xxlarge};
	border: 1px solid ${({theme}) => theme.colors.border.normal};
	position: fixed;
	background-color: ${({theme}) => theme.colors.background.normal};

  ::-webkit-scrollbar {
      display: none;
  }
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
  left: 0;
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${({theme}) => theme.colors.border.normal};
  display: flex;
  justify-content: space-between;
  align-items: center;
	color: ${({theme}) => theme.colors.text.normal};
`;

export const ChattingHeaderText = styled.span`
  font-size: ${({theme}) => theme.font.medium};
  font-weight: 800;
`;

export const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

export const Nickname = styled.span`
  font-weight: 800;
  font-size: ${({theme}) => theme.font.large};
`;

export const Message = styled.div`
  color: ${({theme}) => theme.colors.text.normal};
  font-size: ${({theme}) => theme.font.medium};
  align-self: flex-start;
  word-break: break-word;
`;