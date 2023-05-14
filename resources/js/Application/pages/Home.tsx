import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../components/Post";

export default function Home() {
	const [ posts, setPosts ] = useState([]);
	useEffect(()=>{
		axios.get("/api/posts")
			.then(response=>{
				setPosts( response.data.posts.data )
				// console.log(response.data.posts.data);
			});
	},[]);
	return (
		<>
			<div id="posts">
				{
					posts.map((post, i)=>{
						return <Post {...post} key={i} />
					})
				}
			</div>
		</>
	)
}
