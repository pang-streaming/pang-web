import styled from "styled-components";
import { useUsernameToInfo } from "../hook/useProfile";

export const ProfileInfoWidget = () => {
	// const { data: userInfo, isLoading, error } = useUsernameToInfo();
	return (
		<ProfileInfoContainer>
			<InfoContainer>
				<BroadCastInfoWrapper>
					<BroadcastInfoText>가입일</BroadcastInfoText>
					<BroadcastInfoValue>2024. 9. 11.</BroadcastInfoValue>
				</BroadCastInfoWrapper>
			</InfoContainer>
		</ProfileInfoContainer>
	)
}

const ProfileInfoContainer = styled.div`
	width: 100%;
`

const InfoContainer = styled.div`
	border-radius: ${({theme}) => theme.borders.large};
	background-color: ${({theme}) => theme.colors.content.normal};
	box-sizing: border-box;
	padding: 15px;
	gap: 4px;
	display: flex;
	flex-direction: column;
`

const BroadCastInfoWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 5px;
	gap: 30px;
`

const BroadcastInfoText = styled.span`
	color: ${({theme}) => theme.colors.text.subtitle};
	font-size: ${({theme}) => theme.font.medium};
	font-weight: 700;
	width: 100px;
`

const BroadcastInfoValue = styled.span`
	color: ${({theme}) => theme.colors.text.normal};
	font-size: ${({theme}) => theme.font.medium};
	font-weight: 500;
`