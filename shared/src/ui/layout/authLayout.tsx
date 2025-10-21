import {Outlet} from "react-router-dom";
import styled from "styled-components";

export const AuthLayout = () => {
	return (
		<MainContainer>
			<Outlet />
		</MainContainer>
	)
}

const MainContainer = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`