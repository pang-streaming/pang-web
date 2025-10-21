import { Navigate, Outlet } from "react-router-dom";
import { tokenStorage } from "../../lib/cookie";

export const ProtectedLayout = () => {
	const token = tokenStorage.getAccessToken();
	
	if (!token) {
		return <Navigate to="/login" replace />;
	}
	
	return <Outlet />;
}