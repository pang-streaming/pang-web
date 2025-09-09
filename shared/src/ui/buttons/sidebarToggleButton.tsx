import styled from "styled-components";
import {IoMenu} from "react-icons/io5";

interface SidebarToggleButtonProps {
	onClick: () => void;
}

export const SidebarToggleButton = ({onClick}: SidebarToggleButtonProps) => {
	return (
		<ButtonContent onClick={onClick}>
			<IoMenu size={28} />
		</ButtonContent>
	)
}

// export const SidebarToggleButton = styled(IoMenu)`
//     cursor: pointer;
// 	padding: 6px;
// 	border-radius: ${({theme}) => theme.borders.large};
//     color: ${({ theme }) => theme.colors.button.active};
//
//     &:hover {
//         background-color: ${({theme}) => theme.colors.hover.light};
//     }
// `

const ButtonContent = styled.button`
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 6px;
    box-sizing: border-box;
    background: none;
    border-radius: ${({ theme }) => theme.borders.large};
    color: ${({ theme }) => theme.colors.button.active};
	
    display: flex;
    align-items: center;
    justify-content: center;
	
    &:hover {
        background-color: ${({ theme }) => theme.colors.hover.light};
    }
`;
