import { Video } from "./types";
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
	const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;
	const username = localStorage.getItem("username");
	let watchlistData: any = [];
	if (username) {
		watchlistData = formatVideoAPIData(
			(await getJSONData(
				`${VITE_PUBLIC_API_URL}/userAPI/getWatchlist?username=` + username,
			)) || [{ id: "0" }],
		);
	}

	if (shouldTrySetVideoData) {
		const videosData = formatVideoAPIData(
			(await getJSONData(`${VITE_PUBLIC_API_URL}/videoAPI/getVideoData`)) || [
				{ id: "0" },
			],
		);

		const moviesData = [];
		const documentariesData = [];
		const tvshowsData = [];

		for (let i = 0; i < videosData.length; i++) {
			if (videosData[i].category === "movies") {
				console.log("movie");
				moviesData.push(videosData[i]);
			} else if (videosData[i].category === "documentarys") {
				console.log("documentary");
				documentariesData.push(videosData[i]);
			} else if (videosData[i].category === "tvshows") {
				console.log("tvshow");
				tvshowsData.push(videosData[i]);
			}
		}

		setWatchlistdb(watchlistData);
		setMoviesdb(moviesData);
		setDocumentariesdb(documentariesData);
		setTvShowsdb(tvshowsData);
		setVideosdb(videosData);
		setLoading(false);
	}

	setWatchlist(watchlistData);
}

export { getJSONData, postJSONData, deleteJSONData, formatVideoAPIData, fetchData };
