import backArrow from "../assets/img/backArrow.png";
import { useState, useEffect } from "react";

interface ProductProps {
	name: string;
	videoURL: string;
	previousPage: string;
}

function VideoViewer({ name, videoURL, previousPage }: ProductProps) {
	const [active, setActive] = useState(true);
	const hideControlsDelay = 2000;
	let hideControlsTimeout: any;
	function hideControls() {
		setActive(false);
	}
	function handleMouseMove() {
		setActive(true);
		clearTimeout(hideControlsTimeout);
		hideControlsTimeout = setTimeout(hideControls, hideControlsDelay);
	}
	useEffect(() => {
		hideControlsTimeout = setTimeout(hideControls, hideControlsDelay);
		document.addEventListener("mousemove", handleMouseMove);
		return () => {
			clearTimeout(hideControlsTimeout);
			document.removeEventListener("mousemove", handleMouseMove);
			clearTimeout(hideControlsTimeout);
		};
	}, []);
	document.title = "Hexagon TV | Watching " + name;
	return (
		<div className="main">
			<div className="videoPage">
				<p
					onClick={() => {
						window.location.href = previousPage;
					}}
					className="videoPageHeaderNav"
					style={active ? { display: "flex" } : { display: "none" }}>
					<img src={backArrow} draggable="false" height={32} alt="back arrow" />
					<p style={{ marginTop: "5px" }}>{name}</p>
				</p>
				<video src={videoURL} controls={active} className="video" id="myVideo" />
			</div>
		</div>
	);
}

export default VideoViewer;
