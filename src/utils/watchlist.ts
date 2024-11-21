import { postJSONData, deleteJSONData } from "./api";

function addToWatchlist(name: string, urlName: string, thumbnailURL: string, setIsInWatchlist: any) {
	const username = localStorage.getItem("username") || "";
	const id = localStorage.getItem("id") || "";
	setIsInWatchlist(true);
	postJSONData(`https://api.hexagon.kiwi-micro.com:8072/addToWatchlist`, { name, urlName, thumbnailURL, username, id });
}

function removeFromWatchlist(urlName: string, setIsInWatchlist: any) {
	const username = localStorage.getItem("username") || "";
	const id = localStorage.getItem("id") || "";
	setIsInWatchlist(false);
	deleteJSONData(`https://api.hexagon.kiwi-micro.com:8072/removeFromWatchlist`, { urlName, username, id });
}

export { addToWatchlist, removeFromWatchlist };
