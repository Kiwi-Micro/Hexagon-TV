import { postJSONData, deleteJSONData, fetchData } from "./api";
import { getSessionId, getUserId, getUsername } from "./userInfo";

const VITE_PUBLIC_CLERK_SIGN_IN_URL =
	(await fetch("/API/keys/signInURL").then((res) => res.json())) || "";

async function addToWatchlist(
	name: string,
	urlName: string,
	thumbnailURL: string,
	setIsInWatchlist: any,
) {
	setIsInWatchlist(true);
	const userId = getUserId();
	const sessionId = getSessionId();
	const username = getUsername();
	try {
		const data = await postJSONData("/API/userAPI/addToWatchlist", {
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
		fetchData(false, username);
	} catch (error) {
		setIsInWatchlist(false);
		console.log(error);
		window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
		return;
	}
}

async function removeFromWatchlist(urlName: string, setIsInWatchlist: any) {
	setIsInWatchlist(false);
	const userId = getUserId();
	const sessionId = getSessionId();
	const username = getUsername();
	try {
		const data = await deleteJSONData("/API/userAPI/deleteFromWatchlist", {
			urlName,
			username,
			sessionId,
			userId,
		});
		if (data.status !== "success") {
			window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
			return;
		}
		fetchData(false, username);
	} catch (error) {
		setIsInWatchlist(true);
		console.log(error);
		window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
		return;
	}
}

export { addToWatchlist, removeFromWatchlist };
