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
		Cookies.set("innovagram-cookie", true, {expires: 60*60*24, sameSite: 'lax'})
	} catch (e) {
		return false;
	}
	return true;
}

export async function Logout() {
	return await axios.post('/api/logout')
		.then(function (response) {
			Cookies.remove("innovagram-cookie");
		})
		.catch(function (error) {
			console.log(error);
		});
}
