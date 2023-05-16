import {useRef} from "react";
import axios from "axios";
import "../../../css/register.css";
import {Login} from "../utils/auth";
import {useNavigate} from "react-router-dom";


export default function Register() {
	let navigate = useNavigate();
	let image = useRef();
	let name = useRef();
	let username = useRef();
	let email = useRef();
	let password = useRef();
	let repassword = useRef();
	const register = (e) => {
		e.preventDefault();
		let payload = new FormData();
		payload.append("image", image.current.files[0]);
		payload.append("name", email.current.value);
		payload.append("email", email.current.value);
		payload.append("username", username.current.value);
		payload.append("password", password.current.value);
		axios.post("/api/register", payload, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response=>{
			if ( Login() ) {
				console.log(response);
				navigate("/");
			}
		})
	}
	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					Register
				</div>
				<form onSubmit={register}>
					<div className="form-group">
						<label htmlFor="image">Image</label>
						<input ref={image} type="file" id="image" name="image" multiple={false} required={true} />
						<small className="hide">***Select Image</small>
					</div>
					<div className="form-group">
						<label htmlFor="name">Full Name</label>
						<input ref={name} type="text" id="name" name="name" required={true} />
						<small className="hide">***Enter Name</small>
					</div>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input ref={username} type="text" id="username" name="username" required={true} />
						<small className="hide">***Enter username</small>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input ref={email} type="email" id="email" name="email" required={true} />
						<small className="hide">***Enter Email</small>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input ref={password} type="password" id="password" name="password" required={true} />
						<small className="hide">***Enter Password</small>
					</div>
					<div className="form-group">
						<label htmlFor="repassword">Password</label>
						<input ref={repassword} type="password" id="repassword" name="repassword" required={true} />
						<small className="">***Re Enter Password</small>
					</div>
					<div className="form-group">
						<button type="submit">Resigter</button>
					</div>
				</form>
			</div>
		</div>
	)
}
