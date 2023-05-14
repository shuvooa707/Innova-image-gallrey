import {useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			});
	}
	const testing = (e) => {
		e.preventDefault();
		axios.get('/api/testing1')
			.then(response => {
				console.log(response)
				navigate('/');
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
						<button onClick={testing}>testing1</button>
					</form>
				</div>
			</div>
		</>
	)
}
