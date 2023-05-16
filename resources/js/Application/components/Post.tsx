import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {light} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ShowPostContext from "../utils/showPostContext";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../../../css/swiper-style.css";
import isLoggedIn from "../utils/auth";


export default function Post(props) {

	const navigate = useNavigate();

	const [currentpost, setPost] = useState(props.post);
	const {
		id,
		content,
		medias,
		user,
		comments,
		liked_by_me
	} = props.post;

	const [totallikes, setTotallikes] = useState(props.post.totallikes);
	const [liked, setLiked] = useState(false);
	useEffect(()=>{
		setLiked(liked_by_me);
	},[]);

	const likepost = () => {
		if ( !isLoggedIn() ) {
			navigate("/login");
			return
		}
		axios.post("/api/like", {
			post_id: id
		}).then(response=>{
			setLiked(!liked);
			setPost(response.data.post);
			setTotallikes(response.data.post.totallikes)
		});
	}
	const unlikepost = () => {
		if ( !isLoggedIn() ) {
			navigate("/login");
			return
		}
		axios.post("/api/unlike", {
			post_id: id
		}).then(response => {
			setLiked(!liked);
			setPost(response.data.post);
			setTotallikes(response.data.post.totallikes);
		});
	}


	const { showPostModal, setCurrentPost } = useContext(ShowPostContext);

	return (
		<>
			<div className="post">
				<div className="posted-by-container">
					<div className="posted-by-image">
						<img src={"/img/user/" + user.image} alt=""/>
					</div>
					<div className="posted-by-name">
						<Link to={"/u/"+user.id}>
							{user.name}
						</Link>
						<br/>
						<div id="posted-by-name-date"> 12th may </div>
					</div>
				</div>
				<div className="image-container">
					<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
					{
						medias.map((media, i) => {
							return (
								<SwiperSlide key={i}>
									<img className="post-image" src={"/img/post/" + media.path} key={i}/>
								</SwiperSlide>
							)
						})
					}
					</Swiper>
				</div>
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
						Likes {totallikes}
						<i className="fa-solid fa-circle separator-dot"></i>
						Comments {comments.length}
					</span>
				</div>
				<div className="leave-comment">
					<a style={{ color: "blue", cursor: "pointer" }} onClick={()=>{ showPostModal(); setCurrentPost(currentpost);  }}>View Comments</a>
				</div>
			</div>
			<hr className="post-separator" />
		</>
	)
}
