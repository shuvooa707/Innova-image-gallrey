import {useParams} from "react-router-dom";
import "../../../css/user-page-style.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ShowPostContext from "../utils/showPostContext";


export default function User() {
	let params = useParams();
	const [user, setUser] = useState();
	const [comment_count, setCommentCount] = useState(0);
	const [like_count, setLikeCount] = useState(0);
	const id = params.id;
	useEffect(()=>{
		axios.get("/api/user/" + id)
			.then( response => {
				let { data } = response;
				if ( data.status == "success" ) {
					setUser(data.user);
					setCommentCount(data.comment_count);
					setLikeCount(data.like_count);
				}
			});

		window.addEventListener("LIKED", function (){
			axios.get("/api/user/" + id)
				.then( response => {
					let { data } = response;
					if ( data.status == "success" ) {
						console.log(data)
						setUser(data.user);
						setCommentCount(data.comment_count);
						setLikeCount(data.like_count);
					}
				})
		});
		window.addEventListener("UNLIKED", function (){
			axios.get("/api/user/" + id)
				.then( response => {
					let { data } = response;
					if ( data.status == "success" ) {
						setUser(data.user);
						setCommentCount(data.comment_count);
						setLikeCount(data.like_count);
					}
				})
		});
	},[]);


	const { showPostModal, setCurrentPost } = useContext(ShowPostContext);

	return (
		<div id="user-page-container">
			<div id="user-page-details">
				<div id="user-page-thumb">
					<img src={"/img/user/"+user?.image} alt="" />
				</div>
				<div id="user-page-info">
					<div id="name">
						<strong>
							{ user?.name }
						</strong>
					</div>
					<div id="user-page-info-stats">
						<small id="user-page-info-post">{ user?.posts.length } posts</small>
						<i className="fa-solid fa-circle separator-dot"></i>
						<small id="user-page-info-comments">{ comment_count } comments</small>
						<i className="fa-solid fa-circle separator-dot"></i>
						<small id="user-page-info-likes">{ like_count } likes</small>
					</div>
				</div>
			</div>
			<div id="user-page-container-post">
				<h4 style={{ textAlign: "center" }}>Posts</h4>
				<div id="user-page-container-post-posts">
					{
						user?.posts.map((post, i)=>{
							return (
								<div onClick={()=>{ showPostModal(); setCurrentPost(post);  }} id="user-page-container-post-posts-item" key={i}>
									<img src={"/img/post/" + post.medias[0].path} alt=""/>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}
