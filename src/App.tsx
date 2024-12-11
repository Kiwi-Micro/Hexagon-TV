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
import NotFound from "./pages/404";
import metaImage from "./assets/img/metaImage.png";
import "./assets/main.css";
import "./assets/nav.css";
import "./assets/video.css";
import "./assets/account.css";

interface VideoInfo {
	category: string;
	date: string;
	description: string;
	id: number;
	name: string;
	rating: string;
	thumbnailURL: string;
	urlName: string;
	videoURL: string;
}

function App() {
	console.log(metaImage);
	const username = localStorage.getItem("username");
	const [watchlist, setWatchlistdb] = useState<VideoInfo[]>([]);
	const [movies, setMoviesdb] = useState<VideoInfo[]>([]);
	const [documentaries, setDocumentariesdb] = useState<VideoInfo[]>([]);
	const [tvshows, setTvShowsdb] = useState<VideoInfo[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(false);
			let watchlistData = [];
			if (username) {
				watchlistData = await getJSONData(`https://api.hexagon.kiwi-micro.com:8072/getWatchlist?username=${username}`);
			}

			const moviesData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/movies");
			const documentariesData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/documentaries");
			const tvshowsData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/tvshows");

			setWatchlistdb(
				watchlistData.map((item: any) => {
					return {
						category: item.category,
						date: item.date,
						description: item.description,
						id: item.id,
						name: item.name,
						rating: item.rating,
						thumbnailURL: item.thumbnailURL,
						urlName: item.urlName,
						videoURL: item.videoURL,
					};
				}),
			);
			setMoviesdb(
				moviesData.map((item: any) => {
					return {
						category: item.category,
						date: item.date,
						description: item.description,
						id: item.id,
						name: item.name,
						rating: item.rating,
						thumbnailURL: item.thumbnailURL,
						urlName: item.urlName,
						videoURL: item.videoURL,
					};
				}),
			);
			setDocumentariesdb(
				documentariesData.map((item: any) => {
					return {
						category: item.category,
						date: item.date,
						description: item.description,
						id: item.id,
						name: item.name,
						rating: item.rating,
						thumbnailURL: item.thumbnailURL,
						urlName: item.urlName,
						videoURL: item.videoURL,
					};
				}),
			);
			setTvShowsdb(
				tvshowsData.map((item: any) => {
					return {
						category: item.category,
						date: item.date,
						description: item.description,
						id: item.id,
						name: item.name,
						rating: item.rating,
						thumbnailURL: item.thumbnailURL,
						urlName: item.urlName,
						videoURL: item.videoURL,
					};
				}),
			);
		};

		fetchData();
	}, []);

	function renderVideoRoutes(db: any, isViewer?: boolean) {
		if (isViewer) {
			return db.map((video: any) => (
				<Route key={video.urlName} path={`/watch/${video.urlName}.html`}>
					<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={`/${video.urlName}.html`} />
				</Route>
			));
		}
		return db.map((video: any) => (
			<Route key={video.urlName} path={`/${video.urlName}.html`}>
				<Video key={video.urlName} name={video.name} videoPage={`/watch/${video.urlName}.html`} thumbnailURL={video.thumbnailURL} db={db} rating={video.rating} description={video.description} urlName={video.urlName} watchlist={watchlist} />
			</Route>
		));
	}

	return (
		<div>
			<Router>
				{loading ? (
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
						<h1>Loading...</h1>
					</div>
				) : (
					<Switch>
						<Route exact path="/">
							<Index watchlist={watchlist} movies={movies} documentaries={documentaries} tvshows={tvshows} />
						</Route>
						<Route path="/search">
							<Search />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/account">
							<Account watchlist={watchlist} />
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
						<Route path="/*">
							<NotFound />
						</Route>
					</Switch>
				)}
			</Router>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
