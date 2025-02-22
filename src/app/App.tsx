import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import type { Video } from "../types";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { renderVideoRoutes, renderAdminEditPages } from "./utils/renders";
import { fetchData } from "./utils/api";
import { getSessionId, getUserId, setUserInfo } from "./utils/userInfo";
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
import { useUser } from "@clerk/clerk-react";

function App() {
	setUserInfo();
	let username = "";
	const { isSignedIn: isUserSignedIn, user, isLoaded: isUserLoaded } = useUser();

	if (!isUserSignedIn || !isUserLoaded) {
		username = "";
		return false;
	}

	username = user.username || "";
	const userId = getUserId();
	const sessionId = getSessionId();

	// Always call hooks first
	const [watchlist, setWatchlistdb] = useState<Video[]>([]);
	const [videos, setVideosdb] = useState<Video[]>([]);
	const [movies, setMoviesdb] = useState<Video[]>([]);
	const [documentaries, setDocumentariesdb] = useState<Video[]>([]);
	const [tvshows, setTvShowsdb] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData(
			true,
			username,
			setWatchlistdb,
			setMoviesdb,
			setDocumentariesdb,
			setTvShowsdb,
			setVideosdb,
			setLoading,
		);
	}, []);

	// Render components conditionally inside the return statement
	const renderAdminRoutes =
		userId && sessionId && username ? (
			<>
				<Route path="/admin" element={<Admin allVideos={videos} />} />
				<Route path="/admin/add" element={<Add />} />
				{renderAdminEditPages(videos)}
			</>
		) : null;

	const renderVideoRoutesContent = renderVideoRoutes(videos, false, watchlist);
	const renderAdditionalRoutes = renderVideoRoutes(videos, true);

	return (
		<div>
			<SpeedInsights />
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
						{renderAdminRoutes}
						{renderVideoRoutesContent}
						{renderAdditionalRoutes}
						<Route path="/*" element={<NotFound />} />
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
