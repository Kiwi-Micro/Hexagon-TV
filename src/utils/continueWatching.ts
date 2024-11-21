import { postJSONData, deleteJSONData } from "./api";

function addToContinueWatching(name: string, urlName: string, thumbnailURL: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	postJSONData(`http://api.hexagon.kiwi-micro.com:8070/addToContinueWatching`, { name, urlName, thumbnailURL, username, id });
}

function removeFromContinueWatching(urlName: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	deleteJSONData(`http://api.hexagon.kiwi-micro.com:8070/removeFromContinueWatching`, { urlName, username, id });
}

export { addToContinueWatching, removeFromContinueWatching };
