import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

export const SearchBar = () => {
	return (
		<SearchBarContainer>
			<SearchBarContent id="search-input" type="text" placeholder="보고싶은 방송을 찾아보세요!"/>
			<SearchBarLabel htmlFor="search-input">
				<SearchBarIcon size={26}/>
			</SearchBarLabel>
		</SearchBarContainer>
	)
}

const SearchBarIcon = styled(IoIosSearch)`
    color: ${({ theme }) => theme.colors.primary.normal};
`

const SearchBarLabel = styled.label`
	position: absolute;
	right: 12px;
    align-items: center;
    display: flex;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
`;

const SearchBarContainer = styled.div`
	align-items: center;
    position: relative;
`

const SearchBarContent = styled.input`
	&:focus {
		outline: none;
	}
    user-select: none;
	color: ${({theme}) => theme.colors.text.normal};
	width: 615px;
	height: 40px;
	border-radius: ${({theme}) => theme.borders.maximum};
	border: none;
    padding-left: 16px;
    padding-right: 40px;
	font-size: 14px;
	background-color: ${({theme}) => theme.colors.content.normal};
`