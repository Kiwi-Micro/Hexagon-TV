import { postJSONData, deleteJSONData } from "./api";

function addToWatchlist(name: string, urlName: string, thumbnailURL: string, setIsInWatchlist: any) {
	const username = localStorage.getItem("username") || "";
	const id = localStorage.getItem("id") || "";
	setIsInWatchlist(true);
	postJSONData(`http://api.hexagon.kiwi-micro.com:8070/addToWatchlist`, { name, urlName, thumbnailURL, username, id });
}

function removeFromWatchlist(urlName: string, setIsInWatchlist: any) {
	const username = localStorage.getItem("username") || "";
	const id = localStorage.getItem("id") || "";
	setIsInWatchlist(false);
	deleteJSONData(`http://api.hexagon.kiwi-micro.com:8070/removeFromWatchlist`, { urlName, username, id });
}

export { addToWatchlist, removeFromWatchlist };
