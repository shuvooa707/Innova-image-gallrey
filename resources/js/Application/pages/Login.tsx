import {useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Login } from "../utils/auth";

export default function login() {
	const navigate = useNavigate();
	const email = useRef();
	const password = useRef();
	const login = (e) => {
		e.preventDefault();
		axios.get('/sanctum/csrf-cookie')
			.then(response => {
				axios.post('/api/login', {
					email: email.current.value,
					password: password.current.value
				})
				.then(function (response) {
					if ( Login() ) {
						navigate("/");
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			});
	}
	return (
		<>
			<div className="container">
				<div className="card">
					<form onSubmit={login}>
						<label htmlFor="email">Email</label>
						<input ref={email} type="text" id="email" name="email" />
						<label htmlFor="password">Password</label>
						<input ref={password} type="text" id="password" name="password" />
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</>
	)
}
