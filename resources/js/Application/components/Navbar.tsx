import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import isLoggedIn, { Logout } from "../utils/auth";
import {useRef} from "react";

export default function Navbar({ setShowCreatePostModal }) {
	const navigate = useNavigate();
	const homePageLinkElement = useRef();

	const [navMenuVisible, setNavMenuVisible] = useState(false);
	const logout = () => {
		if ( Logout() ) {
			navigate("/");
			homePageLinkElement.current.click();
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
			<NavLink to={"/"} ref={homePageLinkElement}>InnovoGram</NavLink>
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
						<NavLink to={"/profile"} className="item">
							<i className="fa-regular fa-user"></i>
							<span style={{marginLeft: "10px"}}>Profile</span>
						</NavLink>
					}
					{
						!isLoggedIn() &&
						<NavLink to={"/register"} className="item">
							<i className="fa-solid fa-user-plus"></i>
							<span style={{marginLeft: "10px"}}>Register</span>
						</NavLink>
					}
					{
						!isLoggedIn() &&
						<NavLink to={"/login"} className="item">
							<i className="fa-solid fa-arrow-right-to-bracket"></i>
							<span style={{marginLeft: "10px"}}>Log In</span>
						</NavLink>
					}
					{
						isLoggedIn() &&
						<NavLink onClick={logout} className="item">
							<i className="fa-solid fa-right-from-bracket fa-flip-horizontal"></i>
							<span style={{marginLeft: "10px"}}>Log Out</span>
						</NavLink>
					}
				</div>
			}
		</nav>
	)
}
