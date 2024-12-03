import ReactDOM from "react-dom/client";
import { getJSONData } from "./utils/api";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import Video from "./pages/Video";
import VideoViewer from "./pages/VideoViewer";
import Search from "./pages/Search";
import Account from "./pages/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DeleteAccount from "./pages/auth/DeleteAccount";
import WipeData from "./pages/auth/WipeData";
import Logout from "./pages/auth/Logout";
import ChangePassword from "./pages/auth/ChangePassword";
//import NotFound from "./pages/404";
import "./assets/main.css";
import "./assets/nav.css";
import "./assets/video.css";
import "./assets/account.css";

function App() {
	const username = localStorage.getItem("username");
	const [watchlist, setWatchlistdb] = useState([]);
	const [continueWatching, setContinueWatchingdb] = useState([]);
	const [movies, setMoviesdb] = useState([]);
	const [documentaries, setDocumentariesdb] = useState([]);
	const [tvshows, setTvShowsdb] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let watchlistData = [];
			let continueWatchingData = [];
			if (username != null) {
				watchlistData = await getJSONData("https://api.hexagon.kiwi-micro.com:8072/getWatchlist?username=" + username);
				continueWatchingData = await getJSONData("https://api.hexagon.kiwi-micro.com:8072/getContinueWatching?username=" + username);
			}

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

	function renderVideoRoutes(db: any, isViewer?: boolean) {
		if (isViewer) {
			return db.map((video: any) => (
				<Route key={video.urlName} path={"/watch/" + video.urlName + ".html"}>
					<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
				</Route>
			));
		}
		return db.map((video: any) => (
			<Route key={video.urlName} path={"/" + video.urlName + ".html"}>
				<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={db} rating={video.rating} description={video.description} urlName={video.urlName} watchlist={watchlist} />
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
					<Route path="/search">
						<Search />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/account">
						<Account continueWatching={continueWatching} watchlist={watchlist} />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/deleteAccount">
						<DeleteAccount />
					</Route>
					<Route path="/wipeData">
						<WipeData />
					</Route>
					<Route path="/logout">
						<Logout />
					</Route>
					<Route path="/logoutAll">
						<Logout all={true} />
					</Route>
					<Route path="/changePassword">
						<ChangePassword />
					</Route>
					{renderVideoRoutes(movies)}
					{renderVideoRoutes(movies, true)}
					{renderVideoRoutes(documentaries)}
					{renderVideoRoutes(documentaries, true)}
					{renderVideoRoutes(tvshows)}
					{renderVideoRoutes(tvshows, true)}
					{/*<Route path="/*">
						<NotFound />
					</Route>*/}
				</Switch>
			</Router>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
