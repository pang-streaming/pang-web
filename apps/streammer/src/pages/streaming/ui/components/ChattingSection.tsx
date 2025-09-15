import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ChatItem {
  id: string;
  viewerName: string;
  chatting: string;
  color?: string;
}

interface TopContributor {
  rank: number;
  name: string;
  amount: string;
}

interface ChattingSectionProps {
  chatList: ChatItem[];
  topContributors: TopContributor[];
  streamId?: string;
  onSendMessage?: (message: string) => void;
}

export const ChattingSection: React.FC<ChattingSectionProps> = ({ 
  chatList, 
  topContributors,
  onSendMessage 
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <ChatSidebar>
      <ChatSidebarHeader>
        <BackButton>
          <BackIcon />
        </BackButton>
        <span>채팅</span>
      </ChatSidebarHeader>
      
      <TopContributorsSection>
        <TopContributorsRow>
          {topContributors.map((contributor) => (
            <ContributorItem key={contributor.rank}>
              <ContributorRankWrap>
                <ContributorRank rank={contributor.rank}>
                  {contributor.rank}
                </ContributorRank>
              </ContributorRankWrap>
              <ContributorInfo>
                <ContributorName>{contributor.name}</ContributorName>
                <ContributorAmountWrap>
                  <ContributorIcon $rank={contributor.rank} />
                  <ContributorAmount>{contributor.amount}</ContributorAmount>
                </ContributorAmountWrap>
              </ContributorInfo>
            </ContributorItem>
          ))}
        </TopContributorsRow>
      </TopContributorsSection>
      
      <ChatSection>
        <ChatMessages>
          {chatList.map((message) => (
            <MessageRow key={message.id}>
              <Nickname style={{ color: message.color }}>
                {message.viewerName}
              </Nickname>
              <Message>{message.chatting}</Message>
            </MessageRow>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>
        
        <InputContainer onSubmit={handleSendMessage}>
          <ChatInput 
            type="text" 
            placeholder="채팅창 문구"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isComposing) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <EmojiButton>
            <EmojiIcon />
          </EmojiButton>
          <SendButton type="submit" disabled={!inputValue.trim()}>
            <SendIcon />
          </SendButton>
        </InputContainer>
        
        <MembershipCheckbox>
          <input type="checkbox" id="membership" />
          <label htmlFor="membership">멤버십 전용 채팅 활성화</label>
        </MembershipCheckbox>
      </ChatSection>
    </ChatSidebar>
  );
};

const ChatSidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-left: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const ChatSidebarHeader = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  
  span {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.common.white};
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

const TopContributorsSection = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const TopContributorsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: 8px;
`;

const ContributorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface ContributorRankProps {
  rank: number;
}

const ContributorRankWrap = styled.div`
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContributorRank = styled.div<ContributorRankProps>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: ${props => {
    switch(props.rank) {
      case 1: return ({ theme }) => theme.colors.primary.normal;
      case 2: return ({ theme }) => theme.colors.secondary.normal;
      case 3: return ({ theme }) => theme.colors.status.neutral;
      default: return ({ theme }) => theme.colors.content.normal;
    }
  }};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
`;

const ContributorInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContributorName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.common.white};
`;

const ContributorAmountWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface ContributorIconProps {
  $rank: number;
}

const ContributorIcon = styled.div<ContributorIconProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    switch(props.$rank) {
      case 1: return props.theme.colors.primary.normal;
      case 2: return props.theme.colors.secondary.normal;
      case 3: return props.theme.colors.status.neutral;
      default: return props.theme.colors.content.normal;
    }
  }};
`;

const ContributorAmount = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatMessages = styled.div`
  flex: 1; 
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const Nickname = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

const Message = styled.div`
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 14px;
  word-break: break-word;
`;

const InputContainer = styled.form`
  width: 100%;
  height: 46px;
  border-top: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  background-color: ${({ theme }) => theme.colors.background.normal};
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  gap: 8px;
`;

const ChatInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.common.white};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
`;

const EmojiButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EmojiIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16'/%3E%3Cpath d='M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const SendButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const SendIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const MembershipCheckbox = styled.div`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primary.normal};
  }
  
  label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.common.white};
    cursor: pointer;
  }
`;

export default ChattingSection;
