import { postJSONData, deleteJSONData, fetchData } from "./api";

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
		const data = await postJSONData(
			`https://api.hexagon.kiwi-micro.com:8080/userAPI/addToWatchlist`,
			{
				name,
				urlName,
				thumbnailURL,
				username,
				sessionId,
				userId,
			},
		);
		if (data.status !== "success") {
			window.location.href = import.meta.env.VITE_SIGNIN_URL;
			return;
		}
		fetchData(false);
	} catch (error) {
		setIsInWatchlist(false);
		console.log(error);
		window.location.href = import.meta.env.VITE_SIGNIN_URL;
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
			`https://api.hexagon.kiwi-micro.com:8080/userAPI/deleteFromWatchlist`,
			{ urlName, username, sessionId, userId },
		);
		if (data.status !== "success") {
			window.location.href = import.meta.env.VITE_SIGNIN_URL;
			return;
		}
		fetchData(false);
	} catch (error) {
		setIsInWatchlist(true);
		console.log(error);
		window.location.href = import.meta.env.VITE_SIGNIN_URL;
		return;
	}
}

export { addToWatchlist, removeFromWatchlist };
