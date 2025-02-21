import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import CustomBreak from "../../components/CustomBreak";
import { Video } from "../../utils/types";
import { useState } from "react";
import { deleteVideo } from "../../utils/videoManipulation";

interface AdminProps {
	allVideos: Video[];
}

function Admin({ allVideos }: AdminProps) {
	document.title = "Hexagon TV Admin | Home";

	const [showDeleteVideoPopup, setShowDeleteVideoPopup] = useState(false);
	const [videoUrlNameToDelete, setVideoUrlNameToDelete] = useState("");
	const [status, setStatus] = useState("Remove");

	function hidePopup() {
		setShowDeleteVideoPopup(false);
		setVideoUrlNameToDelete("");
	}

	function showPopup(videoUrlName: string) {
		setShowDeleteVideoPopup(true);
		setVideoUrlNameToDelete(videoUrlName);
	}

	return (
		<div className="main">
			<GlobalNavBar />
			{showDeleteVideoPopup ? (
				<div className="deleteVideoPopup">
					<div className="deleteVideoPopupText">
						<h1>Are you sure you want to delete this video?</h1>
						<p>This action cannot be undone.</p>
						<div className="deleteVideoPopupButtons">
							<button
								className="redButton"
								onClick={() => deleteVideo(videoUrlNameToDelete, setStatus)}
							>
								{status}
							</button>
							<button className="whiteButton" onClick={hidePopup}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			) : null}
			<CustomBreak height={3} />
			<h1 style={{ textAlign: "center" }}>Admin Page</h1>
			<CustomBreak height={1} />
			<div className="addVideoButtonDiv">
				<button
					onClick={() => (window.location.href = "/admin/add")}
					className="addVideoButton"
				>
					Add Video
				</button>
			</div>
			<CustomBreak height={1} />
			<div className="adminPageCardsWrapper">
				{allVideos
					.slice()
					.reverse()
					.map((video: Video) => (
						<div className="adminPageCard" key={video.urlName}>
							<img src={video.thumbnailURL} draggable="false" alt={video.name} />
							<h2 style={{ marginLeft: "20px" }}>{video.name}</h2>
							<div
								style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
							>
								<button
									onClick={() => (window.location.href = `/admin/edit/${video.urlName}`)}
									className="whiteButton"
								>
									Edit
								</button>
								<button onClick={() => showPopup(video.urlName)} className="redButton">
									Delete
								</button>
							</div>
						</div>
					))}
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Admin;
