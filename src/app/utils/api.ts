import type { Video } from "./types";
import { setWatchlist } from "./userInfo";

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
	shouldTrySetVideoData: boolean,
	setWatchlistdb?: any,
	setMoviesdb?: any,
	setDocumentariesdb?: any,
	setTvShowsdb?: any,
	setVideosdb?: any,
	setLoading?: any,
) {
	const username = localStorage.getItem("username");
	let watchlistData: any = [];
	if (username) {
		watchlistData = formatVideoAPIData(
			(await getJSONData(
				`/API/userAPI/getWatchlist?username=` + username,
			)) || [{ id: "0" }],
		);
	}

	if (shouldTrySetVideoData) {
		const moviesData = formatVideoAPIData(
			(await getJSONData(
				`/API/videoAPI/getVideoData?category=movies`,
			)) || [{ id: "0" }],
		);
		const documentariesData = formatVideoAPIData(
			(await getJSONData(
				`/API/videoAPI/getVideoData?category=documentaries`,
			)) || [{ id: "0" }],
		);
		const tvshowsData = formatVideoAPIData(
			(await getJSONData(
				`/API/videoAPI/getVideoData?category=tvshows`,
			)) || [{ id: "0" }],
		);

		const videosData = [];
		videosData.push(...moviesData);
		videosData.push(...documentariesData);
		videosData.push(...tvshowsData);

		setWatchlistdb(watchlistData);
		setMoviesdb(moviesData);
		setDocumentariesdb(documentariesData);
		setTvShowsdb(tvshowsData);
		setVideosdb(videosData);
		setLoading(false);
	}

	setWatchlist(watchlistData);
}

export {
	getJSONData,
	postJSONData,
	deleteJSONData,
	formatVideoAPIData,
	fetchData,
};
