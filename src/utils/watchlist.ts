import { postJSONData, deleteJSONData } from "./api";

async function addToWatchlist(name: string, urlName: string, thumbnailURL: string, setIsInWatchlist: any) {
	const username = localStorage.getItem("username") || "";
	const id = localStorage.getItem("id") || "";
	const data = await postJSONData(`https://api.hexagon.kiwi-micro.com:8072/addToWatchlist`, { name, urlName, thumbnailURL, username, id });

	if (data.status !== "success") {
		window.location.href = "/login";
		return;
	}
	setIsInWatchlist(true);
}

async function removeFromWatchlist(urlName: string, setIsInWatchlist: any) {
	const username = localStorage.getItem("username") || "";
	const id = localStorage.getItem("id") || "";
	const data = await deleteJSONData(`https://api.hexagon.kiwi-micro.com:8072/removeFromWatchlist`, { urlName, username, id });

	if (data.status !== "success") {
		window.location.href = "/login";
		return;
	}
	setIsInWatchlist(false);
}

export { addToWatchlist, removeFromWatchlist };
