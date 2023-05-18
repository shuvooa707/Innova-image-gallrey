import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import User from "./pages/User";
import CreatePost from "./components/CreatePost";
import Login from "./pages/Login";
import ShowPostContext from "./utils/showPostContext";
import ViewPostModal from "./components/ViewPostModal";
import CustomAlertModal from "./components/CustomAlertModal";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import ProfileContext from "./utils/ProfileContext";

function App() {

	const [showCreatePostModal,  setShowCreatePostModal] = useState(false);
	const [postVisible, setPostVisible] = useState(false);
	const [customAlertVisible, setCustomAlertVisible] = useState(false);
	const [customalertdata, setCustomalertdata] = useState({ content: "Post Create", icon: "success" });
	const [currentpost, setCurrentpost] = useState(null);
	const [profile, setProfile] = useState(null);
	const showPostModal = () => {
		setPostVisible(!postVisible);
	}
	const showCustomAlertVisible = () => {
		setCustomAlertVisible(!customAlertVisible);
	}
	const setCurrentPost = (post) => {
		setCurrentpost(post);
	}


	return (
		<ShowPostContext.Provider value={{ showPostModal, setCurrentPost, showCustomAlertVisible, setCustomalertdata }}>
			<ProfileContext.Provider value={{ profile: profile, setProfile: setProfile }}>
				<div className="container">
					{
						showCreatePostModal &&
						<CreatePost setShowCreatePostModal={setShowCreatePostModal} />
					}
					<Navbar setShowCreatePostModal={()=>{ setShowCreatePostModal(!showCreatePostModal) }}/>
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
				{
					customAlertVisible &&
					<CustomAlertModal message={customalertdata} />
				}
			</ProfileContext.Provider>
		</ShowPostContext.Provider>
	);
}

export default App;

