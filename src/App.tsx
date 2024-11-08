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
	const [movies, setMovies] = useState([]);
	const [documentaries, setDocumentaries] = useState([]);
	const [tvshows, setTvShows] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const moviesData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/movies");
			const documentariesData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/documentaries");
			const tvshowsData = await getJSONData("https://api.hexagon.kiwi-micro.com:8082/tvshows");

			setMovies(moviesData || []);
			setDocumentaries(documentariesData || []);
			setTvShows(tvshowsData || []);
		};

		fetchData();
	}, []);

	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Index />
					</Route>
					{movies.map((video: any) => {
						return (
							<Route path={"/" + video.urlName + ".html"}>
								<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={movies} rating={video.rating} description={video.description} />
							</Route>
						);
					})}
					{movies.map((video: any) => {
						return (
							<Route path={"/watch/" + video.urlName + ".html"}>
								<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
							</Route>
						);
					})}
					{documentaries.map((video: any) => {
						return (
							<Route path={"/" + video.urlName + ".html"}>
								<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={documentaries} rating={video.rating} description={video.description} />
							</Route>
						);
					})}
					{documentaries.map((video: any) => {
						return (
							<Route path={"/watch/" + video.urlName + ".html"}>
								<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
							</Route>
						);
					})}
					{tvshows.map((video: any) => {
						return (
							<Route path={"/" + video.urlName + ".html"}>
								<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={tvshows} rating={video.rating} description={video.description} />
							</Route>
						);
					})}
					{tvshows.map((video: any) => {
						return (
							<Route path={"/watch/" + video.urlName + ".html"}>
								<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
							</Route>
						);
					})}
					{/*<Route path="/*">
						<NotFound />
					</Route>*/}
				</Switch>
			</Router>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
