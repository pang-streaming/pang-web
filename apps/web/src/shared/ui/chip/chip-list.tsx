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
				<ChipData to={"/explore?chip=" + chip.name} type={chip.type}>{chip.name}</ChipData>
			))}
		</ChipContainer>
	)
}

const ChipContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	max-height: 20px;
	gap: 5px;
	overflow: hidden;
`

const ChipData = styled(Link)<{type: 'main' | 'special' | 'normal'}>`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding: 6px 5px;
	border-radius: ${({theme}) => theme.borders.medium};
	color: ${({theme, type}) =>
		type === 'main' ? theme.colors.primary.normal:
		type === 'special' ? theme.colors.secondary.light:
		theme.colors.text.normal
	};
	border: 1px solid ${({theme, type}) =>
		type === 'main' ? theme.colors.primary.normal:
		type === 'special' ? theme.colors.secondary.light:
		theme.colors.text.normal
	};
	text-decoration: none;
	font-size: ${({theme}) => theme.font.small};
	font-weight: bold;

	&:hover {
			background-color: ${({theme}) => theme.colors.hover.light};
	}
`