import { Video } from "./types";

async function getJSONData(url: string) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		throw new Error(`Failed to fetch data: ${error}`);
	}
}

async function postJSONData(url: string, data: any) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		throw new Error(`Failed to post data: ${error}`);
	}
}

async function deleteJSONData(url: string, data: any) {
	try {
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		throw new Error(`Failed to delete data: ${error}`);
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

export { getJSONData, postJSONData, deleteJSONData, formatVideoAPIData };
