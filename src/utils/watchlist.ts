import { postJSONData, deleteJSONData, fetchData } from "./api";

const VITE_PUBLIC_CLERK_SIGN_IN_URL = import.meta.env.VITE_PUBLIC_CLERK_SIGN_IN_URL;
const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;

async function addToWatchlist(
	name: string,
	urlName: string,
	thumbnailURL: string,
	setIsInWatchlist: any,
) {
	setIsInWatchlist(true);
	const username = localStorage.getItem("username") || "";
	const sessionId = localStorage.getItem("sessionId") || "";
	const userId = localStorage.getItem("userId") || "";
	try {
		const data = await postJSONData(`${VITE_PUBLIC_API_URL}/userAPI/addToWatchlist`, {
			name,
			urlName,
			thumbnailURL,
			username,
			sessionId,
			userId,
		});
		if (data.status !== "success") {
			window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
			return;
		}
		fetchData(false);
	} catch (error) {
		setIsInWatchlist(false);
		console.log(error);
		window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
		return;
	}
}

async function removeFromWatchlist(urlName: string, setIsInWatchlist: any) {
	setIsInWatchlist(false);
	const username = localStorage.getItem("username") || "";
	const sessionId = localStorage.getItem("sessionId") || "";
	const userId = localStorage.getItem("userId") || "";
	try {
		const data = await deleteJSONData(
			`${VITE_PUBLIC_API_URL}/userAPI/deleteFromWatchlist`,
			{ urlName, username, sessionId, userId },
		);
		if (data.status !== "success") {
			window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
			return;
		}
		fetchData(false);
	} catch (error) {
		setIsInWatchlist(true);
		console.log(error);
		window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
		return;
	}
}

export { addToWatchlist, removeFromWatchlist };
