import {IconType} from "react-icons";
import styled from "styled-components";

interface IconButtonProps {
	Icon: IconType;
	onClick?: () => void;
}

export const IconButton = ({ Icon, onClick }: IconButtonProps) => {
	return (
		<ButtonContent onClick={onClick}>
			<Icon size={24} />
		</ButtonContent>
	);
}

const ButtonContent = styled.button`
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 6px;
    box-sizing: border-box;
    background: none;
    border-radius: ${({ theme }) => theme.borders.maximum};
    color: ${({ theme }) => theme.colors.button.normal};
	
    display: flex;
    align-items: center;
    justify-content: center;
	
    &:hover {
        background-color: ${({ theme }) => theme.colors.hover.light};
    }
`;
