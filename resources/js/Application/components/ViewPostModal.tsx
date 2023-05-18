import {useContext, useEffect, useState} from "react";
import ShowPostContext from "../utils/showPostContext";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
// import required modules
import {Pagination} from "swiper";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import isLoggedIn from "../utils/auth";
import {useRef} from "react";

export default function ViewPostModal({Post}) {
	console.log(Post)
	const navigate = useNavigate();
	const [post, setPost] = useState(Post);
	const [comments, setComments] = useState(Post.comments);
	const { showPostModal, showCustomAlertVisible, setCustomalertdata } = useContext(ShowPostContext);
	const { liked_by_me } = post;
	const [liked, setLiked] = useState(false);
	const commentInput = useRef();
	useEffect(()=>{
		setLiked(liked_by_me);
	},[]);

	const likepost = () => {
		if ( !isLoggedIn() ) {
			navigate("/login");
			return
		}
		axios.post("/api/like", {
			post_id: post.id
		}).then(response=>{
			setLiked(!liked);
			setPost(response.data.post);
		});
	}
	const unlikepost = () => {
		if ( !isLoggedIn() ) {
			navigate("/login");
			return;
		}
		axios.post("/api/unlike", {
			post_id: post.id
		}).then(response => {
			setLiked(!liked);
			setPost(response.data.post);
		});
	}

	const makeComment = () => {
		if ( commentInput.current.value.length < 1 ) return;
		axios.post("/api/comments/create", {
			"content": commentInput.current.value,
			"post_id": post.id
		}).then(response => {
			if ( response.data.status == "success" ) {
				commentInput.current.value = ``;
				setComments([...comments, response.data.comment]);
				document.querySelector(".comments-container").scrollBy(0,1000);
			}
		})
	}

	return (
		<div id="showpost-container">
			<div id="showpost-close" onClick={showPostModal}>
				<i className="fa-solid fa-xmark"></i>
			</div>
			<div id="showpost-post">
				<div id="showpost-image">
					<Swiper pagination={true} navigation={true} modules={[Navigation]} className="mySwiper">
						{
							post.medias.map((media, i) => {
								return (
									<SwiperSlide key={i}>
										<img className="post-image" src={"/img/post/" + media.path} key={i}/>
									</SwiperSlide>
								)
							})
						}
					</Swiper>
				</div>
				<div id="showpost-comment">
					<div id="showpost-comment-user">
						<Link to={"/u/" + post.user.id} onClick={showPostModal}>
							<img id="user-image" style={{width: "50px", height: "50px"}}
								 src={"/img/user/" + post.user.image} alt=""/>
							<span id="user-name">{post.user.name}</span>
							<div id="posted-by-name-date"> 12th may</div>
						</Link>
					</div>
					<div id="showpost-comment-postcontent">
						<div id="showpost-comment-postcontent-content">
							{ post.content }
						</div>
						<div>
							<br/>
							<hr/>
							<div className="like-container">
								{
									!liked &&
									<span onClick={likepost} className="like-button" title="Like">
										<i className="fa-regular fa-heart"></i>
									</span>
								}
								{
									liked &&
									<span onClick={unlikepost} className="unlike-button" title="Unlike">
										<i className="fa-solid fa-heart" style={{color: "#e01b24"}}></i>
									</span>
								}
								<span className="like-comment-count">
									{post?.totallikes || '' } likes
									<i className="fa-solid fa-circle separator-dot"></i>
									{post?.comments.length} comments
								</span>
							</div>
						</div>
					</div>
					<div id="showpost-comment-comments">
						<div className="comment-container">
							<div className="comments-container">
								{
									comments.map((comment, i) => {
										return (
											<div className="comment" key={i}>
												<Link to={"/u/" + comment.user.id} onClick={showPostModal}>
													<div className="commenter">
														<div className="commenter-image">
															<img src={"/img/user/" + comment.user.image} alt=""/>
														</div>
														<div className="commenter-name">
															{comment.user.name}
														</div>
													</div>
												</Link>
												<div className="comment-content">
													{comment.content}
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
					<br/>
					<div className="add-comment-container">
						<textarea ref={commentInput} name="" className="new-comment" rows="5"></textarea>
						<button onClick={ makeComment }>
							Shoot <i className="fa-solid fa-paper-plane"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
