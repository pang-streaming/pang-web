import {Outlet, useNavigate} from "react-router-dom";
import {LoginModal} from "../modals/loginModal";
import {tokenStorage} from "../../lib/cookie";

export const ProtectedLayout = () => {
	const navigate = useNavigate();
	const accessToken = tokenStorage.getAccessToken();
	
	const handleCancel = () => {
		navigate(-1);
	}
	
	const handleConfirm = () => {
		navigate('/login');
	}
	
	if (!accessToken) {
		return (
			<LoginModal
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
		);
	}
	
	return (
			<Outlet />
	)
}