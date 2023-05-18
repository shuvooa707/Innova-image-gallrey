import {useContext, useEffect, useState} from "react";
import ShowPostContext from "../utils/showPostContext";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
// import required modules
import "../../../css/custom-alert.css"

export default function CustomAlertModal({ message }) {
	const { content, icon = "success" } = message

	const { showCustomAlertVisible } = useContext(ShowPostContext);
	useEffect(()=>{
		setTimeout(()=>{
			showCustomAlertVisible();
		},2000);
	},[]);

	return (
		<div id="custom-alert-container">
				<span id="position-setter">
					<div id="custom-alert-card" className="animate__bounceIn animate__">
						<div id="custom-alert-body" className="">
								{content}
								{
									icon == "success" &&
									<span style={{marginLeft: "5px", color: "green", fontSize: "bold"}}>
										<i className="fa-solid fa-check-double"></i>
									</span>
								}
								{
									icon == "failed" &&
									<i className="fa-solid fa-bug"></i>
								}
							</div>
					</div>
				</span>
		</div>
	)
}
