import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { Video } from "../../utils/types";
import CustomBreak from "../../components/CustomBreak";
import { useState } from "react";
import { deleteJSONData } from "../../utils/api";

interface DeleteProps {
	video: Video;
}

function handleCancel() {
	window.location.href = "/";
}

async function handleRemove(urlName: string, setStatus: any) {
	/* TODO: Fix the API Call */
	const userId = localStorage.getItem("userId");
	const sessionId = localStorage.getItem("sessionId");
	setStatus("Removing...");
	try {
		const responce = await deleteJSONData(
			"https://api.hexagon.kiwi-micro.com:8080/videoAPI/delete",
			{
				urlName: urlName,
				userId: userId,
				sessionId: sessionId,
			},
		);
		if (responce.status === "success") {
			window.location.href = "/";
		} else {
			setStatus("Failed to remove!");
		}
	} catch (e: any) {
		setStatus("Failed to remove!");
	}
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
						onClick={() => handleRemove(video.urlName, setStatus)}
					>
						{status}
					</button>
					<button className="whiteButton" onClick={() => handleCancel()}>
						Cancel
					</button>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Delete;
