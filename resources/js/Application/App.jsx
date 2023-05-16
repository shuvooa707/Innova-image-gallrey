import React, {useState} from 'react';
import {NavLink, Route, RouterProvider, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import User from "./pages/User";
import CreatePost from "./components/CreatePost";
import Login from "./pages/Login";
import SliderTest from "./pages/SliderTest";
import ShowPostContext from "./utils/showPostContext";
import ViewPostModal from "./components/ViewPostModal";
import { Logout } from "./utils/auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";

function App() {

	const [ showCreatePostModal,  setShowCreatePostModal] = useState(false);

	const [postVisible, setPostVisible] = useState(false);
	const [currentpost, setCurrentpost] = useState(null);
	const showPostModal = () => {
		setPostVisible(!postVisible);
	}
	const setCurrentPost = (post) => {
		setCurrentpost(post);
	}



	return (
		<ShowPostContext.Provider value={{ showPostModal: showPostModal, setCurrentPost: setCurrentPost }}>
			<div className="container">
				{
					showCreatePostModal &&
					<CreatePost setShowCreatePostModal={setShowCreatePostModal} />
				}
				<Navbar
					setShowCreatePostModal={()=>{ setShowCreatePostModal(!showCreatePostModal) }}
				/>
				<Routes>
					<Route element={<Home />} path={"/"}></Route>
					<Route element={<Register />} path={"/register"}></Route>
					<Route element={<Login />} path={"/login"}></Route>
					<Route element={<User />} path={"/u/:id"}></Route>
					{/*<Route element={<SliderTest />} path={"/slidertest"}></Route>*/}
					<Route element={<ProtectedRoutes />}>
						<Route element={<Profile />} path={"/profile"}></Route>
					</Route>
				</Routes>
			</div>
			{
				postVisible &&
				<ViewPostModal Post={currentpost} />
			}
		</ShowPostContext.Provider>
	);
}

export default App;
