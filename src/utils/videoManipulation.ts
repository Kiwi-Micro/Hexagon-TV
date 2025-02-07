import { deleteJSONData, postJSONData } from "./api";
import { Video } from "./types";

async function addVideo(video: Video) {
	const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;
	const VITE_PUBLIC_CLERK_SIGN_IN_URL = import.meta.env.VITE_PUBLIC_CLERK_SIGN_IN_URL;
	const name = video.name;
	const description = video.description;
	const category = video.category;
	const thumbnailURL = video.thumbnailURL;
	const videoURL = video.videoURL;
	const urlName = video.urlName;
	const ageRating = video.rating;
	const data = await postJSONData(`${VITE_PUBLIC_API_URL}/videoAPI/add`, {
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
		window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
		return;
	}
	window.location.href = "/admin";
}

async function deleteVideo(urlName: string, setStatus: any) {
	const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;
	const userId = localStorage.getItem("userId");
	const sessionId = localStorage.getItem("sessionId");
	setStatus("Removing...");
	try {
		const responce = await deleteJSONData(`${VITE_PUBLIC_API_URL}/videoAPI/delete`, {
			urlName: urlName,
			userId: userId,
			sessionId: sessionId,
		});
		if (responce.status === "success") {
			window.location.href = "/admin";
		} else {
			setStatus("Failed to remove!");
		}
	} catch (e: any) {
		setStatus("Failed to remove!");
	}
}

export { addVideo, deleteVideo };
