import styled from "styled-components"
import {FaRegHeart} from "react-icons/fa";

export const HeartBox = () => {
    return (
    <Container>
	    <FaRegHeart size={20} />
	    <Count>22360</Count>
    </Container>
    )
}

const Container = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: ${({theme}) => theme.borders.xlarge};
  border: 2px solid ${({theme}) => theme.colors.border.normal};
	color: ${({theme}) => theme.colors.border.normal};
	user-select: none;
	cursor: pointer;
	&:hover {
			background-color: ${({theme}) => theme.colors.hover.light};
	}
`

const Count = styled.span`
    font-size: ${({theme}) => theme.font.medium};
    font-weight: 500;
`