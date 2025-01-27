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
		id: video.id,
		name: video.name,
		description: video.description,
		category: video.category,
		thumbnailURL: video.thumbnailURL,
		videoURL: video.videoURL,
		date: video.date,
		rating: video.rating,
		ratingInfo: video.ratingInfo,
		urlName: video.urlName,
	}));
}

async function fetchData(
	setWatchlistdb: any,
	setMoviesdb: any,
	setDocumentariesdb: any,
	setTvShowsdb: any,
	setLoading: any,
) {
	const username = localStorage.getItem("username");
	let watchlistData: any = [];
	if (username) {
		watchlistData = formatVideoAPIData(
			(await getJSONData(
				"https://api.hexagon.kiwi-micro.com:8080/userAPI/getWatchlist?username=" +
					username,
			)) || [{ id: "0" }],
		);
	}

	const moviesData = formatVideoAPIData(
		(await getJSONData(
			"https://api.hexagon.kiwi-micro.com:8080/videoAPI/getVideoData?category=movies",
		)) || [{ id: "0" }],
	);
	const documentariesData = formatVideoAPIData(
		(await getJSONData(
			"https://api.hexagon.kiwi-micro.com:8080/videoAPI/getVideoData?category=documentaries",
		)) || [{ id: "0" }],
	);
	const tvshowsData = formatVideoAPIData(
		(await getJSONData(
			"https://api.hexagon.kiwi-micro.com:8080/videoAPI/getVideoData?category=tvshows",
		)) || [{ id: "0" }],
	);

	setWatchlistdb(watchlistData);
	setMoviesdb(moviesData);
	setDocumentariesdb(documentariesData);
	setTvShowsdb(tvshowsData);
	setLoading(false);
}

export { getJSONData, postJSONData, deleteJSONData, formatVideoAPIData, fetchData };
