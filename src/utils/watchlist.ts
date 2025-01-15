import { postJSONData, deleteJSONData } from "./api";

async function addToWatchlist(
	name: string,
	urlName: string,
	thumbnailURL: string,
	setIsInWatchlist: any,
) {
	const username = localStorage.getItem("username") || "";
	const sessionId = localStorage.getItem("sessionId") || "";
	try {
		const data = await postJSONData(
			`https://api.hexagon.kiwi-micro.com:8080/userAPI/addToWatchlist`,
			{
				name,
				urlName,
				thumbnailURL,
				username,
				sessionId,
			},
		);
		if (data.status !== "success") {
			window.location.href = "/login";
			return;
		}
		setIsInWatchlist(true);
	} catch (error) {
		console.log(error);
		window.location.href = "/login";
		return;
	}
}

async function removeFromWatchlist(
	urlName: string,
	setIsInWatchlist: any,
) {
	const username = localStorage.getItem("username") || "";
	const sessionId = localStorage.getItem("sessionId") || "";
	try {
		const data = await deleteJSONData(
			`https://api.hexagon.kiwi-micro.com:8080/userAPI/removeFromWatchlist`,
			{ urlName, username, sessionId },
		);
		if (data.status !== "success") {
			window.location.href = "/login";
			return;
		}
		setIsInWatchlist(false);
	} catch (error) {
		console.log(error);
		window.location.href = "/login";
		return;
	}
}

export { addToWatchlist, removeFromWatchlist };
