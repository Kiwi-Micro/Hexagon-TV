import { getJSONData } from "./api";

function addToContinueWatching(name: string, urlName: string, thumbnailURL: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	getJSONData(`http://api.hexagon.kiwi-micro.com:8070/addToContinueWatching?name=${name}&urlName=${urlName}&thumbnailURL=${thumbnailURL}&username=${username}&id=${id}`);
}

function removeFromContinueWatching(urlName: string) {
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");
	getJSONData(`http://api.hexagon.kiwi-micro.com:8070/removeFromContinueWatching?urlName=${urlName}&username=${username}&id=${id}`);
}

export { addToContinueWatching, removeFromContinueWatching };
