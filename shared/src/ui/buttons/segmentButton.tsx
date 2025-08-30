import styled from "styled-components";
import {useState} from "react";
import React from "react";

export const SegmentButton = ({tabs, onClick}: SegmentButtonProps) => {
	const [active, setActive] = useState(tabs[0]);

	return (
		<SegmentContainer>
			{tabs.map((tab) => (
				<TabButton onClick={() => {setActive(tab); onClick(tab);}} isActive={tab === active}>{tab}</TabButton>
			))}
		</SegmentContainer>
	)
};

export default SegmentButton;

interface SegmentButtonProps {
	tabs: string[],
	onClick: (tab: string) => void
}

const SegmentContainer = styled.div`
  display: flex;
	width: 100%;
	align-items: center;
	justify-content: start;
`;

const TabButton = styled.button<{isActive: boolean}>`
	background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme, isActive }) => isActive ? theme.colors.primary.normal : theme.colors.primary.normal};
    
	font-size: 24px;
	&:hover {
        color: ${({ theme }) => theme.colors.primary.normal};
    }
	
    border-bottom: ${({theme, isActive}) => isActive && theme.colors.primary.normal} 4px solid;
`
