import { postJSONData, deleteJSONData, fetchData } from "./api";

const VITE_PUBLIC_CLERK_SIGN_IN_URL = await fetch(
	"/API/keys/publicKey",
).then((res) => res.json());

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
		const data = await postJSONData(`/API/userAPI/addToWatchlist`, {
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
		window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
		return;
	}
}

async function removeFromWatchlist(
	urlName: string,
	setIsInWatchlist: any,
) {
	setIsInWatchlist(false);
	const username = localStorage.getItem("username") || "";
	const sessionId = localStorage.getItem("sessionId") || "";
	const userId = localStorage.getItem("userId") || "";
	try {
		const data = await deleteJSONData(`/API/userAPI/deleteFromWatchlist`, {
			urlName,
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
		setIsInWatchlist(true);
		window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
		return;
	}
}

export { addToWatchlist, removeFromWatchlist };
