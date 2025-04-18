import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Video } from "./utils/types";
import { renderVideoRoutes, renderAdminEditPages } from "./utils/renders";
import { fetchData } from "./utils/api";
import { setUserInfo } from "./utils/userInfo";
import Index from "./pages/Index";
import Search from "./pages/Search";
import NotFound from "./pages/404";
import Admin from "./pages/admin/Admin";
import "./assets/main.css";
import "./assets/nav.css";
import "./assets/video.css";
import "./assets/cards.css";
import "@uploadthing/react/styles.css";
import Add from "./pages/admin/Add";

function App() {
	setUserInfo();
	const userId = localStorage.getItem("userId");
	const sessionId = localStorage.getItem("sessionId");
	const username = localStorage.getItem("username");
	const [watchlist, setWatchlistdb] = useState<Video[]>([]);
	const [videos, setVideosdb] = useState<Video[]>([]);
	const [movies, setMoviesdb] = useState<Video[]>([]);
	const [documentaries, setDocumentariesdb] = useState<Video[]>([]);
	const [tvshows, setTvShowsdb] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData(
			true,
			setWatchlistdb,
			setMoviesdb,
			setDocumentariesdb,
			setTvShowsdb,
			setVideosdb,
			setLoading,
		);
	}, []);

	return (
		<div>
			<Router>
				{loading ? (
					<div className="center">
						<h1>Loading...</h1>
					</div>
				) : (
					<Routes>
						<Route
							path="/"
							element={
								<Index movies={movies} documentaries={documentaries} tvshows={tvshows} />
							}
						/>
						<Route path="/search" element={<Search />} />
						{userId && sessionId && username ? (
							<Route path="/admin" element={<Admin allVideos={videos} />} />
						) : null}
						{userId && sessionId && username ? (
							<Route path="/admin/add" element={<Add />} />
						) : null}
						{userId && sessionId && username ? renderAdminEditPages(videos) : null}
						{renderVideoRoutes(videos, false, watchlist)}
						{renderVideoRoutes(videos, true)}
						<Route path="/*" element={<NotFound />} />
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
