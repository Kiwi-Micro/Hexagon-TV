import { deleteJSONData, postJSONData } from "./api";
import type { Video, VideoUpdate } from "../../types";
import { getSessionId, getUserId } from "./userInfo";

const VITE_PUBLIC_CLERK_SIGN_IN_URL = await fetch("/API/keys/signInURL").then((res) =>
	res.json(),
);

async function addVideo(video: Video) {
	const userId = getUserId();
	const sessionId = getSessionId();
	const name = video.name;
	const description = video.description;
	const category = video.category;
	const thumbnailURL = video.thumbnailURL;
	const videoURL = video.videoURL;
	const urlName = video.urlName;
	const ageRating = video.ageRating;
	const data = await postJSONData(`/API/videoAPI/addVideo`, {
		userId,
		sessionId,
		name,
		description,
		category,
		thumbnailURL,
		videoURL,
		urlName,
		ageRating,
	});
	if (data.status !== "success") {
		window.open(VITE_PUBLIC_CLERK_SIGN_IN_URL, "_blank");
		return;
	}
	window.location.href = "/admin";
}

async function updateVideo(video: VideoUpdate) {
	const userId = getUserId();
	const sessionId = getSessionId();
	const id = video.id;
	const name = video.name;
	const description = video.description;
	const category = video.category;
	const thumbnailURL = video.thumbnailURL;
	const videoURL = video.videoURL;
	const urlName = video.urlName;
	const ageRating = video.ageRating;
	const data = await postJSONData(`/API/videoAPI/updateVideo`, {
		userId,
		sessionId,
		id,
		name,
		description,
		category,
		thumbnailURL,
		videoURL,
		urlName,
		ageRating,
		currentUrlName: video.currentUrlName,
	});
	if (data.status !== "success") {
		window.open(VITE_PUBLIC_CLERK_SIGN_IN_URL, "_blank");
		return;
	}
	window.location.href = "/admin";
}

async function deleteVideo(urlName: string, setStatus: any) {
	const userId = getUserId();
	const sessionId = getSessionId();
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

export { addVideo, updateVideo, deleteVideo };
