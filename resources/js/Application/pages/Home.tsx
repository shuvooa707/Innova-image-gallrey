import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";




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
	},[]);

	const fetchMoreData = () => {
		axios.get(`/api/posts?offset=${posts.length}`)
			.then(response => {
				setPosts( [...posts, ...response.data.posts] );
			});
	}

	return (
		<>
			<div id="posts">
				<InfiniteScroll
					dataLength={posts.length}
					next={fetchMoreData}
					hasMore={true}
					scrollableTarget="posts"
					loader={
						<div style={{textAlign: "center"}}>
							<img src="/img/loader.gif" width="50px" height="50px"/>
						</div>
					}
				>
					{
						posts.map((post, i) => {
							return (
								<Post post={post} key={i} />
							)
						})
					}
				</InfiniteScroll>
			</div>
		</>
	)
}
