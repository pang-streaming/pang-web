import { Link } from "react-router-dom";
import styled from "styled-components";
import { MainLiveProps } from "../explore/livecard/mainlivecard/mainlivecard.props";
import { SiEnterprisedb } from "react-icons/si";
import { PiEnvelopeThin, PiExportThin } from "react-icons/pi";
import { LuArrowRightToLine } from "react-icons/lu";



export const LiveDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 35px;
`

export const StreamerInfo = styled.div`
  display: flex;
`


export const VideoContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`
export const Video = styled.img`
  width: 95%;
  border-radius: 20px;
  margin-bottom: 17px;
`




export const ChatArea = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid #404040;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
`
export const ChatHeader = styled.div`
  width: 100%;
  height: 46px;
  border-bottom: 1px solid #404040;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ChatHeaderText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #A3A3A3;
  margin-right: 30px;
`

export const ChatHeaderIcon = styled(LuArrowRightToLine)`
  font-size: 20px;
  color: #A3A3A3;
  margin-left: 15px;
`




export const Spacer = styled.div`
  flex: 1;
`



export const ChattingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`
export const ChattingElemContainer = styled.div`
  padding: 12px;

`
export const ChattingViewer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`

export function randomColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }
export const ChattingViewerName = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: ${randomColor};
`
export const ChattingMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: white;
`





export const ChattingInputContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`
export const ChattingInput = styled.div`
  width: 90%;
  height: 40px;
  background-color: #262626;
  border-radius: 8px;
  display: flex;
`
export const ChattingTextField = styled.input`
  padding-left: 16px;
  width: 75%;
  color: #D4D4D4;
  background-color: #262626;
  font-size: 13px;
  font-weight: 400;
  outline: none;
  border: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`




export const SendContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

`
export const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    font-size: 17px;
    color: #D4D4D4;
}
  :hover {
      color: white;
}
`
export const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: #D4D4D4;
}
  :hover {
      color: white;
  }
`
