import Cookies from "js-cookie";
import axios from "axios";
export default function isLoggedIn(): boolean {
	if ( Cookies.get("innovagram-cookie") ) {
		return true;
	}
	return false;
}


export async function Login(): boolean {
	try {
		Cookies.set("innovagram-cookie", true, {expires: 86400, sameSite: 'lax'})
	} catch (e) {
		return false;
	}
	return true;
}

export async function Logout(): boolean {
	try {
		axios.post('/api/logout')
		.then(function (response) {
			Cookies.remove("innovagram-cookie");
		})
		.catch(function (error) {
			console.log(error);
		});
	} catch (e) {
		//return false;
	} finally {
		return true;
	}
}
