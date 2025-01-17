import { getJSONData, formatVideoAPIData } from "./utils/api";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Video } from "./utils/types";
import {
	Index,
	VideoPage,
	VideoViewer,
	Search,
	NotFound,
	SignIn,
	SignUp,
} from "./utils/pages";
import { SpeedInsights } from "@vercel/speed-insights/react";
import setUserInfo from "./utils/userInfo";
import "./assets/main.css";
import "./assets/nav.css";
import "./assets/video.css";
import "./assets/account.css";

function App() {
	setUserInfo();
	const [watchlist, setWatchlistdb] = useState<Video[]>([]);
	const [movies, setMoviesdb] = useState<Video[]>([]);
	const [documentaries, setDocumentariesdb] = useState<Video[]>([]);
	const [tvshows, setTvShowsdb] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
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
					"https://api.hexagon.kiwi-micro.com:8080/videoAPI/movies",
				)) || [{ id: "0" }],
			);
			const documentariesData = formatVideoAPIData(
				(await getJSONData(
					"https://api.hexagon.kiwi-micro.com:8080/videoAPI/documentaries",
				)) || [{ id: "0" }],
			);
			const tvshowsData = formatVideoAPIData(
				(await getJSONData(
					"https://api.hexagon.kiwi-micro.com:8080/videoAPI/tvshows",
				)) || [{ id: "0" }],
			);

			setWatchlistdb(watchlistData);
			setMoviesdb(moviesData);
			setDocumentariesdb(documentariesData);
			setTvShowsdb(tvshowsData);
			setLoading(false);
		};

		fetchData();
	}, []);

	function renderVideoRoutes(db: Video[], isViewer?: boolean) {
		if (isViewer) {
			return db.map((video: Video) => (
				<Route
					key={video.urlName}
					path={`/watch/${video.urlName}.html`}
					element={
						<VideoViewer
							key={video.urlName}
							name={video.name}
							videoURL={video.videoURL}
							previousPage={`/${video.urlName}.html`}
						/>
					}
				/>
			));
		}
		return db.map((video: Video) => (
			<Route
				key={video.urlName}
				path={`/${video.urlName}.html`}
				element={
					<VideoPage
						key={video.urlName}
						videoInfo={video}
						db={db}
						watchlist={watchlist}
					/>
				}
			/>
		));
	}

	return (
		<div>
			<SpeedInsights />
			<Router>
				{loading ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							height: "100vh",
							width: "100vw",
						}}
					>
						<h1>Loading...</h1>
					</div>
				) : (
					<Routes>
						<Route
							path="/"
							element={
								<Index
									watchlist={watchlist}
									movies={movies}
									documentaries={documentaries}
									tvshows={tvshows}
								/>
							}
						/>
						<Route path="/search" element={<Search />} />
						<Route path="/login" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						{renderVideoRoutes(movies)}
						{renderVideoRoutes(movies, true)}
						{renderVideoRoutes(documentaries)}
						{renderVideoRoutes(documentaries, true)}
						{renderVideoRoutes(tvshows)}
						{renderVideoRoutes(tvshows, true)}
						<Route path="/*" element={<NotFound />} />
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
