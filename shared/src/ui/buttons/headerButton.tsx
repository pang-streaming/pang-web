import styled from "styled-components";
import { IconType } from "react-icons";

interface HeaderButtonProps {
	Icon: IconType;
	onClick?: () => void;
}

export const HeaderButton = ({ Icon, onClick }: HeaderButtonProps) => {
	return (
		<ButtonContent onClick={onClick}>
			<Icon size={24} />
		</ButtonContent>
	);
};

const ButtonContent = styled.button`
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 6px;
    box-sizing: border-box;
    background: none;
    border-radius: ${({ theme }) => theme.borders.large};
    color: ${({ theme }) => theme.colors.button.normal};
	
    display: flex;
    align-items: center;
    justify-content: center;
	
    &:hover {
        background-color: ${({ theme }) => theme.colors.hover.light};
    }
`;
