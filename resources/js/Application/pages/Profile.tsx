import {useParams} from "react-router-dom";
import "../../../css/user-page-style.css";
import {useEffect, useState} from "react";
import axios from "axios";
import "../../../css/profile.css"

export default function User() {
	let params = useParams();
	const [profile, setProfile] = useState();
	const [comment_count, setCommentCount] = useState(0);
	const [like_count, setLikeCount] = useState(0);
	const [posts, setPosts] = useState([]);
	const id = params.id;
	useEffect(()=>{
		axios.get("/api/profile")
			.then(response=>{
				setProfile(response.data.profile)
				setCommentCount(response.data.comment_count);
				setLikeCount(response.data.like_count);
				setPosts(response.data.profile.posts);
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
	},[]);

	const deletePost = (post_id) => {
		axios.post("/api/posts/destroy", { "post_id": post_id })
			.then(response=>{
				setPosts(response.data.posts);
			})
	}

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
				<h4 style={{ textAlign: "center" }}>Posts</h4>
				<div id="user-page-container-post-posts">
					{
						posts.map((post, i)=>{
							return (
								<div id="user-page-container-post-posts-item" key={i}>
									<span onClick={()=> deletePost(post.id) } id="user-page-container-post-posts-item-delete" title="Delete Post">
										<i className="fa-solid fa-trash"></i>
									</span>
									<img src={"/img/post/"+post?.medias[0].path} alt=""/>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}
