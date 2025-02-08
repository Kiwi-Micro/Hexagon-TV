import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import type { Video } from "../../utils/types";
import CustomBreak from "../../components/CustomBreak";
import { useState } from "react";
import { deleteVideo } from "../../utils/videoManipulation";

interface DeleteProps {
	video: Video;
}

function Delete({ video }: DeleteProps) {
	document.title = "Hexagon TV Admin | Delete " + video.name;
	const [status, setStatus] = useState("Remove");
	return (
		<div className="main">
			<GlobalNavBar />
			<CustomBreak height={3} />
			<div className="center">
				<h1>Remove {video.name}?</h1>
				<p>Are you sure you want to remove {video.name}?</p>
				<div className="buttons">
					<button
						className="redButton"
						style={{ width: "fit-content" }}
						onClick={() => deleteVideo(video.urlName, setStatus)}
					>
						{status}
					</button>
					<button
						className="whiteButton"
						onClick={() => (window.location.href = "/admin")}
					>
						Cancel
					</button>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Delete;
