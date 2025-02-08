import { deleteJSONData, postJSONData } from "./api";
import type { Video } from "./types";

async function addVideo(video: Video) {
	const name = video.name;
	const description = video.description;
	const category = video.category;
	const thumbnailURL = video.thumbnailURL;
	const videoURL = video.videoURL;
	const urlName = video.urlName;
	const ageRating = video.rating;
	const data = await postJSONData(`/API/videoAPI/addVideo`, {
		userId: localStorage.getItem("userId") || "",
		sessionId: localStorage.getItem("sessionId") || "",
		name,
		description,
		category,
		thumbnailURL,
		videoURL,
		urlName,
		ageRating,
	});
	if (data.status !== "success") {
		window.location.href = "/";
		return;
	}
	window.location.href = "/admin";
}

async function deleteVideo(urlName: string, setStatus: any) {
	const userId = localStorage.getItem("userId");
	const sessionId = localStorage.getItem("sessionId");
	setStatus("Removing...");
	try {
		const responce = await deleteJSONData(`/API/videoAPI/deleteVideo`, {
			urlName: urlName,
			userId: userId,
			sessionId: sessionId,
		});
		if (responce.status === "success") {
			window.location.href = "/admin";
		} else {
			setStatus("Failed to remove!");
		}
	} catch (error) {
		console.log(error);
		setStatus("Failed to remove!");
	}
}

export { addVideo, deleteVideo };
