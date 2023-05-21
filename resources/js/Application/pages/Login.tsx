import {useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Login} from "../utils/auth";
import "../../../css/login.css";

export default function login() {
	const navigate = useNavigate();
	const email = useRef();
	const password = useRef();
	const [loginFailed, setLoginFailed] = useState(false);
	const login = (e) => {
		e.preventDefault();
		axios.get('/sanctum/csrf-cookie')
			.then(response => {
				axios.post('/api/login', {
					email: email.current.value,
					password: password.current.value
				})
					.then(function (response) {
						if (response.data.status == "success") {
							Login()
							navigate("/profile");
						} else {
							setLoginFailed(true);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			});
	}
	return (
		<>
			<div id="login-page-container">
				<div id="login-page-card">
					<h3 style={{textAlign: "center"}}>Login</h3>
					<form onSubmit={login}>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input ref={email} type="text" id="email" name="email"/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input ref={password} type="password" id="password" name="password"/>
						</div>
						<div className="form-group">
							<button type="submit" style={{padding: "10px 20px"}}>Login</button>
						</div>
						{
							loginFailed &&
							<div className="form-group">
								<h3 style={{color: "red", textAlign: "center"}}>Incorrect Credentials</h3>
							</div>
						}
					</form>
					<br/><br/>
					<hr id="separator"/>
					<h3 style={{textAlign: "center"}}>Register</h3>
					<button onClick={() => navigate("/register")} id="register-button">Register</button>
				</div>
			</div>
		</>
	)
}
