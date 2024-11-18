import { getJSONData } from "./api";

function addToWatchlist(name: string, urlName: string, thumbnailURL: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	getJSONData(`http://api.hexagon.kiwi-micro.com:8070/addToWatchlist?name=${name}&urlName=${urlName}&thumbnailURL=${thumbnailURL}&username=${username}&id=${id}`);
}

function removeFromWatchlist(urlName: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	getJSONData(`http://api.hexagon.kiwi-micro.com:8070/removeFromWatchlist?urlName=${urlName}&username=${username}&id=${id}`);
}

export { addToWatchlist, removeFromWatchlist };
