import { Video } from "./types";

async function getJSONData(url: string) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(
				`HTTP error! Status: ${response.status}`,
			);
		}
		return await response.json();
	} catch (error) {
		throw new Error(
			`Failed to fetch data: ${error}`,
		);
	}
}

async function postJSONData(
	url: string,
	data: any,
) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(
				`HTTP error! Status: ${response.status}`,
			);
		}
		return await response.json();
	} catch (error) {
		throw new Error(
			`Failed to post data: ${error}`,
		);
	}
}

async function deleteJSONData(
	url: string,
	data: any,
) {
	try {
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(
				`HTTP error! Status: ${response.status}`,
			);
		}
		return await response.json();
	} catch (error) {
		throw new Error(
			`Failed to delete data: ${error}`,
		);
	}
}

async function patchJSONData(
	url: string,
	data: any,
) {
	try {
		const response = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(
				`HTTP error! Status: ${response.status}`,
			);
		}
		return await response.json();
	} catch (error) {
		throw new Error(
			`Failed to patch data: ${error}`,
		);
	}
}

function formatVideoAPIData(db: Video[]) {
	return db.map((video: Video) => ({
		category: video.category,
		date: video.date,
		description: video.description,
		id: video.id,
		name: video.name,
		rating: video.rating,
		thumbnailURL: video.thumbnailURL,
		urlName: video.urlName,
		videoURL: video.videoURL,
	}));
}

function callAPI(
	url: string,
	data: any,
	type?: string,
) {
	if (type === "post") {
		return postJSONData(url, data);
	} else if (type === "patch") {
		return patchJSONData(url, data);
	} else if (type === "delete") {
		return deleteJSONData(url, data);
	} else if (type === "get") {
		return getJSONData(url);
	}
	return getJSONData(url);
}

export {
	getJSONData,
	postJSONData,
	deleteJSONData,
	patchJSONData,
	formatVideoAPIData,
	callAPI,
};
