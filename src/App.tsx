import ReactDOM from "react-dom/client";
import { getJSONData } from "./utils/api";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import Video from "./pages/Video";
import VideoViewer from "./pages/VideoViewer";
//import NotFound from "./pages/404";
import "./assets/main.css";

function App() {
	const [watchlist, setWatchlistdb] = useState([]);
	const [continueWatching, setContinueWatchingdb] = useState([]);
	const [movies, setMoviesdb] = useState([]);
	const [documentaries, setDocumentariesdb] = useState([]);
	const [tvshows, setTvShowsdb] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			// To Fill When User Data API is Ready
			const watchlistData = await getJSONData("");
			const continueWatchingData = await getJSONData("");

			const moviesData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/movies");
			const documentariesData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/documentaries");
			const tvshowsData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/tvshows");

			setWatchlistdb(watchlistData || []);
			setContinueWatchingdb(continueWatchingData || []);
			setMoviesdb(moviesData || []);
			setDocumentariesdb(documentariesData || []);
			setTvShowsdb(tvshowsData || []);
		};

		fetchData();
	}, []);

	function renderVideoRoutes(db: any) {
		return db.map((video: any) => (
			<Route key={video.urlName} path={"/" + video.urlName + ".html"}>
				<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={db} rating={video.rating} description={video.description} />
			</Route>
		));
	}
	function renderVideoViewerRoutes(db: any) {
		return db.map((video: any) => (
			<Route key={video.urlName} path={"/watch/" + video.urlName + ".html"}>
				<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
			</Route>
		));
	}

	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Index watchlist={watchlist} continueWatching={continueWatching} movies={movies} documentaries={documentaries} tvshows={tvshows} />
					</Route>
					{renderVideoRoutes(watchlist)}
					{renderVideoRoutes(continueWatching)}
					{renderVideoRoutes(movies)}
					{renderVideoViewerRoutes(movies)}
					{renderVideoRoutes(documentaries)}
					{renderVideoViewerRoutes(documentaries)}
					{renderVideoRoutes(tvshows)}
					{renderVideoViewerRoutes(tvshows)}
					{/*<Route path="/*">
						<NotFound />
					</Route>*/}
				</Switch>
			</Router>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
