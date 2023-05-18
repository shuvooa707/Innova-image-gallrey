import "../../../css/create-post.css";
import {useState, useRef, useContext} from "react";
import axios from "axios";
import ShowPostContext from "../utils/showPostContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useNavigate} from "react-router-dom";

export default function CreatePost({setShowCreatePostModal}) {
	const navigate = useNavigate();
	const {showCustomAlertVisible, setCustomalertdata} = useContext(ShowPostContext);
	const [postSeleted, setPostSeleted] = useState(0);
	const previewImage = (fileSelector) => {
		let imageInput = document.querySelector(`#${fileSelector}`)
		imageInput.parentElement.querySelector("img")
			.src = URL.createObjectURL(imageInput.files[0]);
		imageInput.parentElement.parentElement.querySelector("i")
			.classList.remove("hide");

		setPostSeleted(postSeleted + 1);
	}
	const removeImage = (fileSelector) => {
		let imageInput = document.querySelector(`#${fileSelector}`)
		console.log(imageInput)
		imageInput.parentElement.querySelector("img")
			.src = `/img/selectimage.png`;
		// imageInput.parentElement.querySelector("input").files.length = 0
		imageInput.parentElement.parentElement.querySelector("i")
			.classList.add("hide");
		console.log(imageInput.parentElement.parentElement.querySelector("i"))
		setPostSeleted(postSeleted - 1);
		imageInput.value = "";
	}

	const content = useRef();

	const img1 = useRef();
	const img2 = useRef();
	const img3 = useRef();
	const img4 = useRef();
	const img5 = useRef();


	const createPost = () => {
		let payload = new FormData();

		if ( content.current.value.length > 3 ) {
			payload.append("content", content.current.value);
		}
		if (img1.current.files.length) payload.append("img1", img1.current.files[0]);
		if (img2.current.files.length) payload.append("img2", img2.current.files[0]);
		if (img3.current.files.length) payload.append("img3", img3.current.files[0]);
		if (img4.current.files.length) payload.append("img4", img4.current.files[0]);
		if (img5.current.files.length) payload.append("img5", img5.current.files[0]);

		axios.post("/api/posts/create", payload)
			.then(response => {
				let {status, post} = response.data;

				if ( status == "success" )
				{
					setShowCreatePostModal(false);
					setCustomalertdata({content: "Post Create", icon: "success"});
					showCustomAlertVisible();

					const NEW_POST_CREATED = new CustomEvent("NEW_POST_CREATED");
					window.dispatchEvent(NEW_POST_CREATED);
					navigate("/profile");
				}
			});
	}

	return (
		<>
			<div id="create-post-container">
				<div id="create-post-body">
					<div id="create-post-header">
						<span>Create Post</span>
						<span id="create-post-header-close" title={"Close"}
							  onClick={() => setShowCreatePostModal(false)}>
							<i className="fas fa-times"></i>
						</span>
					</div>
					<div id="image-selected-image-container">
						<div>
							<i className="fas fa-times hide" onClick={() => removeImage('file1')}></i>
							<label htmlFor="file1">
								<img src={"/img/selectimage.png"} alt=""/>
								<input ref={img1} onInput={() => previewImage('file1')} type="file" id="file1"
									   className="hide"/>
							</label>
						</div>
						<div>
							<i className="fas fa-times hide" onClick={() => removeImage('file2')}></i>
							<label htmlFor="file2">
								<img src={"/img/selectimage.png"} alt=""/>
								<input ref={img2} onInput={() => previewImage('file2')} type="file" id="file2"
									   className="hide"/>
							</label>
						</div>
						<div>
							<i className="fas fa-times hide" onClick={() => removeImage('file3')}></i>
							<label htmlFor="file3">
								<img src={"/img/selectimage.png"} alt=""/>
								<input ref={img3} onInput={() => previewImage('file3')} type="file" id="file3"
									   className="hide"/>
							</label>
						</div>
						<div>
							<i className="fas fa-times hide" onClick={() => removeImage('file4')}></i>
							<label htmlFor="file4">
								<img src={"/img/selectimage.png"} alt=""/>
								<input ref={img4} onInput={() => previewImage('file4')} type="file" id="file4"
									   className="hide"/>
							</label>
						</div>
						<div>
							<i className="fas fa-times hide" onClick={() => removeImage('file5')}></i>
							<label htmlFor="file5">
								<img src={"/img/selectimage.png"} alt=""/>
								<input ref={img5} onInput={() => previewImage('file5')} type="file" id="file5"
									   className="hide"/>
							</label>
						</div>
					</div>
					<div id="create-post-body-input-content">
						<textarea ref={content} name="" placeholder="Write Post Description...(max 200 words)" rows={10}
								  id="create-post-body-input-content">
						</textarea>
					</div>
					<div id="create-post-body-input-submit-button">
						{
							postSeleted > 0 &&
							<button title="Create Post" onClick={createPost}>Share</button>
						}
					</div>

				</div>
			</div>
		</>
	)
}
