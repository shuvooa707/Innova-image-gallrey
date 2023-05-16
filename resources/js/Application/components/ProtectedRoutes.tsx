import {Outlet, Navigate} from "react-router-dom";
import Cookie from "js-cookie";

export default function ProtectedRoutes() {
	if ( Cookie.get("innovagram-cookie") ) {
		return <Outlet />
	}

	return <Navigate to={"/"} replace />;
}
