import {useRef} from "react";
import axios from "axios";
import "../../../css/register.css";
import {Login} from "../utils/auth";
import {useNavigate} from "react-router-dom";


export default function Register() {
	let navigate = useNavigate();
	let image = useRef();
	let name = useRef();
	let phone = useRef();
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

	const showImage = (e) => {
		let previewimage = document.querySelector("#preview-image")
		previewimage.src = URL.createObjectURL(e.target.files[0]);
		console.log(previewimage)
	}
	return (
		<div id="register-container">
			<br/>
			<div className="card">
				<div className="card-header">
					Register
				</div>
				<form onSubmit={register} id="form">
					<div className="form-group" style={{ padding: "10px", textAlign: "right" }}>
						<img id="preview-image" style={{ display: "inline-block" }} src="" alt=""/>
					</div>
					<div className="form-group" style={{ width: "100%" }}>
						<label htmlFor="image">Image</label>
						<input onInput={showImage} style={{ width: "90%" }} ref={image} type="file" id="image" name="image" multiple={false} required={true} />
						<small className="hide">***Select Image</small>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<div className="form-group">
								<label htmlFor="name">Full Name</label>
								<input ref={name} type="text" id="name" name="name" required={true} />
								<small className="hide">***Enter Name</small>
							</div>
							<div className="form-group">
								<label htmlFor="phone">Phone</label>
								<input ref={phone} type="text" id="phone" name="phone" required={true} />
								<small className="hide">***Enter Phone</small>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input ref={password} type="password" id="password" name="password" required={true} />
								<small className="hide">***Enter Password</small>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input ref={email} type="email" id="email" name="email" required={true} />
								<small className="hide">***Enter Email</small>
							</div>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<input ref={username} type="text" id="username" name="username" required={true} />
								<small className="hide">***Enter username</small>
							</div>
							<div className="form-group">
								<label htmlFor="repassword">Retype Password</label>
								<input ref={repassword} type="password" id="repassword" name="repassword" required={true} />
								<small className="hide">***Re Enter Password</small>
							</div>
						</div>
					</div>
					<div className="form-group" >
						<button type="submit" style={{ padding: "10px 15px" }}>Resigter</button>
					</div>
				</form>
			</div>
		</div>
	)
}
