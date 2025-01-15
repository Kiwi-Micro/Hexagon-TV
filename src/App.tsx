import ReactDOM from "react-dom/client";
import { getJSONData, formatVideoAPIData } from "./utils/api";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Video } from "./utils/types";
import {
	Index,
	VideoPage,
	VideoViewer,
	Search,
	Account,
	Register,
	Logout,
	ChangePassword,
	PasswordEntry,
	NotFound,
} from "./utils/pages";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./assets/main.css";
import "./assets/nav.css";
import "./assets/video.css";
import "./assets/account.css";

function App() {
	const username = localStorage.getItem("username");
	const [watchlist, setWatchlistdb] = useState<Video[]>([]);
	const [movies, setMoviesdb] = useState<Video[]>([]);
	const [documentaries, setDocumentariesdb] = useState<Video[]>([]);
	const [tvshows, setTvShowsdb] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
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
						<Route
							path="/login"
							element={
								<PasswordEntry
									operationName="Login"
									operationURL="http://api.hexagon.kiwi-micro.com:8071/auth"
									operationFailMessage="There was an error logging you in! Please try again later."
									operationAPIType="post"
									isLogin={true}
								/>
							}
						/>
						<Route
							path="/account"
							element={<Account watchlist={watchlist} />}
						/>
						<Route path="/register" element={<Register />} />
						<Route
							path="/deleteAccount"
							element={
								<PasswordEntry
									operationName="Delete Account"
									operationURL="https://api.hexagon.kiwi-micro.com:8081/delete"
									operationFailMessage="There was an error deleting your account! Please try again later."
									isDangerous={true}
									operationAPIType="delete"
								/>
							}
						/>
						<Route
							path="/wipeData"
							element={
								<PasswordEntry
									operationName="Wipe Data"
									operationURL="https://api.hexagon.kiwi-micro.com:8081/wipe"
									operationFailMessage="There was an error wiping your data! Please try again later."
									isDangerous={true}
									operationAPIType="delete"
								/>
							}
						/>
						<Route path="/logout" element={<Logout />} />
						<Route path="/logoutAll" element={<Logout all={true} />} />
						<Route path="/changePassword" element={<ChangePassword />} />
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<App />,
);
