import {Chip} from "@/entities/chip/model/type";
import styled from "styled-components";
import {Link} from "react-router-dom";

interface ChipListProps {
	chips: Chip[];
}

export const ChipList = ({ chips }: ChipListProps) => {
	return (
		<ChipContainer>
			{chips.map((chip) => (
				<Chip to={"/explore?chip=" + chip.name} type={chip.type}>{chip.name}</Chip>
			))}
		</ChipContainer>
	)
}

const ChipContainer = styled.div`
	display: flex;
	flex-direction: row;
	max-height: 20px;
	gap: 5px;
`

const Chip = styled(Link)<{type: 'main' | 'special' | 'normal'}>`
	display: flex;
	align-items: center;
	padding: 5px;
	border-radius: ${({theme}) => theme.borders.medium};
	color: ${({theme}) => theme.colors.text.normal};
	background-color: ${({theme}) => theme.colors.content.normal};
	text-align: start;
	text-decoration: none;
	font-size: ${({theme}) => theme.font.small};
	
	&:hover {
			background-color: ${({theme}) => theme.colors.hover.light};
	}
`