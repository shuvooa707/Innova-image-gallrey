import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import {Logout} from "../utils/auth";
import {useRef} from "react";


export default function Home() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		axios.get("/api/posts")
			.then(response => {
				setPosts(response.data.posts);
			});
	}, []);

	useEffect(()=>{
		window.addEventListener("NEW_POST_CREATED", function (){
			axios.get("/api/posts")
				.then(response => {
					setPosts(response.data.posts);
				});
		});
		window.addEventListener("NEW_COMMENT_CREATED", function (event){
			updateCommentedPost(event.detail.post)
		});
	},[]);

	const updateCommentedPost = (newPost) => {
		console.log(newPost);
	}

	const fetchMoreData = () => {
		axios.get(`/api/posts?offset=${posts.length}`)
			.then(response => {
				setPosts( [...posts, ...response.data.posts] );
			});
	}


	return (
		<>
			<div id="posts">
				{
					posts.map((post, i) => {
						if ( posts.length-5 < i ){
							return (
								<Post loadMore={fetchMoreData} lastpost={true} post={post} key={i} />
							)
						}
						return (
							<Post lastpost={false} post={post} key={i} />
						)
					})
				}
			</div>
		</>
	)
}
