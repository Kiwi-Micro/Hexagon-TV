import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Video } from "./utils/types";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { renderVideoRoutes } from "./utils/renders";
import { fetchData } from "./utils/api";
import setUserInfo from "./utils/userInfo";
import Index from "./pages/Index";
import Search from "./pages/Search";
import NotFound from "./pages/404";
import "./assets/main.css";
import "./assets/nav.css";
import "./assets/video.css";
import "./assets/cards.css";

function App() {
	setUserInfo();
	const [watchlist, setWatchlistdb] = useState<Video[]>([]);
	const [movies, setMoviesdb] = useState<Video[]>([]);
	const [documentaries, setDocumentariesdb] = useState<Video[]>([]);
	const [tvshows, setTvShowsdb] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData(setWatchlistdb, setMoviesdb, setDocumentariesdb, setTvShowsdb, setLoading);
	}, []);

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
						{renderVideoRoutes(movies, false, watchlist)}
						{renderVideoRoutes(movies, true)}
						{renderVideoRoutes(documentaries, false, watchlist)}
						{renderVideoRoutes(documentaries, true)}
						{renderVideoRoutes(tvshows, false, watchlist)}
						{renderVideoRoutes(tvshows, true)}
						<Route path="/*" element={<NotFound />} />
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
