import styled from "styled-components";

interface SegmentButtonProps {
	text: string;
	isActive?: boolean;
	onClick: () => void;
}

export const SegmentButton = ({text, isActive = false, onClick}: SegmentButtonProps) => {
	return (
		<SegmentButtonContainer isActive={isActive} onClick={onClick}>
			{text}
			<SegmentButtonBottomBar isActive={isActive}/>
		</SegmentButtonContainer>
	)
}

const SegmentButtonBottomBar = styled.div<{isActive: boolean}>`
	height: 4px;
	width: 80%;
	background-color: ${({theme, isActive}) => isActive ? theme.colors.primary.normal : "none"};
	border-radius: ${({theme}) => theme.borders.maximum};
`

const SegmentButtonContainer = styled.span<{isActive: boolean}>`
    user-select : none;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1px;
    width: fit-content;
    align-items: center;

    font-size: 24px;
		font-weight: bold;
    color: ${({theme, isActive}) => isActive ? theme.colors.primary.normal : theme.colors.button.disabled};
		padding: 5px 12px;
		box-sizing: border-box;
		border-radius: ${({theme}) => theme.borders.large};
		
    &:hover {
        color: ${({theme}) => theme.colors.text.normal};
		    background-color: ${({theme}) => theme.colors.hover.light};
    }

    &:hover ${SegmentButtonBottomBar} {
        background-color: ${({theme}) => theme.colors.text.normal};
    }
`
