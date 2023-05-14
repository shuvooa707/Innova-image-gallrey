import React, {useState} from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import User from "./pages/User";
import CreatePost from "./components/CreatePost";
import Login from "./pages/Login";


function App() {
	const [ showCreatePostModal,  setShowCreatePostModal] = useState(false);
	return (
		<>
			<div className="container">
				{
					showCreatePostModal &&
					<CreatePost setShowCreatePostModal={setShowCreatePostModal} />
				}
				<nav className={"navbar"}>
					<NavLink to={"/"}>InnovoGram</NavLink>
					<button id={"create-post-button"} onClick={()=> setShowCreatePostModal(!showCreatePostModal) } >
						<i className="fa-sharp fa-solid fa-circle-plus" style={{ color: "#ffffff" }}></i>
					</button>
					<span style={{ cursor: "pointer"}}>
						{/*<NavLink to={"/register"}>Sign Up</NavLink>*/}
						{/*<NavLink to={"/profile"}>Profile</NavLink>*/}
						<i className="fa-solid fa-bars" style={{ color: "#ffffff", margin: "0px 50px" }}></i>
					</span>
				</nav>
				<Routes>
					<Route element={<Home />} path={"/"}></Route>
					<Route element={<Register />} path={"/register"}></Route>
					<Route element={<Login />} path={"/login"}></Route>
					<Route element={<Profile />} path={"/profile"}></Route>
					<Route element={<User />} path={"/user"}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
