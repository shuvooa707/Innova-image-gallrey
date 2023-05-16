import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import isLoggedIn, { Logout } from "../utils/auth";
import showPostContext from "../utils/showPostContext";

export default function Navbar({ setShowCreatePostModal }) {
	const navigate = useNavigate();

	const [navMenuVisible, setNavMenuVisible] = useState(false);
	const logout = () => {
		if ( Logout() ) {
			navigate("/");
		}
	}

	const _setShowCreatePostModal = () => {
		if ( !isLoggedIn() ) {
			navigate("/login");
			return;
		}
		setShowCreatePostModal();
	}

	return (
		<nav className={"navbar"}>
			<NavLink to={"/"}>InnovoGram</NavLink>
			<button id={"create-post-button"} onClick={_setShowCreatePostModal}>
				<i className="fa-sharp fa-solid fa-circle-plus" style={{ color: "#ffffff" }}></i>
			</button>
			<span style={{ cursor: "pointer"}} onClick={()=>{setNavMenuVisible(!navMenuVisible)}}>
				<i className="fa-solid fa-bars" style={{ color: "#ffffff", margin: "0px 50px" }}></i>
			</span>
			{
				navMenuVisible &&
				<div id="navmenu" onClick={()=>{setNavMenuVisible(!navMenuVisible)}}>
					{
						isLoggedIn() &&
						<div className="item">
							<i className="fa-regular fa-user"></i>
							<NavLink to={"/profile"}>Profile</NavLink>
						</div>
					}
					{
						!isLoggedIn() &&
						<div className="item">
							<i className="fa-solid fa-user-plus"></i>
							<NavLink to={"/register"}>Register</NavLink>
						</div>
					}
					{
						!isLoggedIn() &&
						<div className="item">
							<i className="fa-solid fa-arrow-right-to-bracket"></i>
							<NavLink to={"/login"}>Log In</NavLink>
						</div>
					}
					{
						isLoggedIn() &&
						<div className="item">
							<i className="fa-solid fa-right-from-bracket fa-flip-horizontal"></i>
							<a onClick={logout}>Log Out</a>
						</div>
					}
				</div>
			}
		</nav>
	)
}
