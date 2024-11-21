import { postJSONData, deleteJSONData } from "./api";

function addToContinueWatching(name: string, urlName: string, thumbnailURL: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	postJSONData(`https://api.hexagon.kiwi-micro.com:8072/addToContinueWatching`, { name, urlName, thumbnailURL, username, id });
}

function removeFromContinueWatching(urlName: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	deleteJSONData(`https://api.hexagon.kiwi-micro.com:8072/removeFromContinueWatching`, { urlName, username, id });
}

export { addToContinueWatching, removeFromContinueWatching };
