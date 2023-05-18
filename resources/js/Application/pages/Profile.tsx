import {useNavigate, useParams} from "react-router-dom";
import "../../../css/user-page-style.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import "../../../css/profile.css"
import ShowPostContext from "../utils/showPostContext";
import isLoggedIn from "../utils/auth";
import ProfileContext from "../utils/ProfileContext";

export default function Profile() {
	const { profile, setProfile } = useContext(ProfileContext);
	//const [profile, setProfile] = useState();
	const [comment_count, setCommentCount] = useState(0);
	const [like_count, setLikeCount] = useState(0);
	const [posts, setPosts] = useState([]);

	useEffect(()=>{
		axios.get("/api/profile")
			.then(response=>{
				setProfile(response.data.profile)
				setCommentCount(response.data.comment_count);
				setLikeCount(response.data.like_count);
				setPosts(response.data.posts);
			})
	},[]);
	useEffect(()=>{
		window.addEventListener("NEW_POST_CREATED", function (){
			axios.get("/api/profile")
				.then(response=>{
					setProfile(response.data.profile)
					setCommentCount(response.data.comment_count);
					setLikeCount(response.data.like_count);
					setPosts(response.data.profile.posts);
				})
		});
		window.addEventListener("NEW_COMMENT_CREATED", function (){
			axios.get("/api/profile")
				.then(response=>{
					setProfile(response.data.profile)
					setCommentCount(response.data.comment_count);
					setLikeCount(response.data.like_count);
					setPosts(response.data.profile.posts);
				})
		});
		window.addEventListener("LIKED", function (){
			axios.get("/api/profile")
				.then(response=>{
					setProfile(response.data.profile)
					setCommentCount(response.data.comment_count);
					setLikeCount(response.data.like_count);
					setPosts(response.data.profile.posts);
				})
		});
		window.addEventListener("UNLIKED", function (){
			axios.get("/api/profile")
				.then(response=>{
					setProfile(response.data.profile)
					setCommentCount(response.data.comment_count);
					setLikeCount(response.data.like_count);
					setPosts(response.data.profile.posts);
				})
		});
	},[]);


	const deletePost = (post_id) => {
		axios.post("/api/posts/destroy", { "post_id": post_id })
			.then(response=>{
				setProfile(response.data.profile)
				setCommentCount(response.data.comment_count);
				setLikeCount(response.data.like_count);
				setPosts(response.data.profile.posts);
			})
	}


	const { showPostModal, setCurrentPost } = useContext(ShowPostContext);

	return (
		<div id="user-page-container">
			<div id="user-page-details">
				<div id="user-page-thumb">
					<img src={"/img/user/"+profile?.image} alt="" />
				</div>
				<div id="user-page-info">
					<div id="name">
						<strong>
							{ profile?.name }
						</strong>
					</div>
					<div id="user-page-info-stats">
						<small id="user-page-info-post">{ profile?.posts.length } posts</small>
						<i className="fa-solid fa-circle separator-dot"></i>
						<small id="user-page-info-comments">{ comment_count || 0 } comments</small>
						<i className="fa-solid fa-circle separator-dot"></i>
						<small id="user-page-info-likes">{ like_count || 0 } likes</small>
					</div>
				</div>
			</div>
			<div id="user-page-container-post">
				<div style={{ textAlign: "center" }}>
					<h4 style={{ textAlign: "center" }}>
						Posts
						<i className="fa-solid fa-photo-film ml-2"></i>
					</h4>
				</div>
				<div id="user-page-container-post-posts">
					{
						posts.map((post, i)=>{
							return (
								<div id="user-page-container-post-posts-item" key={i}>
									<span onClick={()=> deletePost(post.id) } id="user-page-container-post-posts-item-delete" title="Delete Post">
										<i className="fa-solid fa-trash"></i>
									</span>
									<img onClick={()=>{ showPostModal(); setCurrentPost(post);  }} src={"/img/post/"+post?.medias[0].path} alt=""/>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}
