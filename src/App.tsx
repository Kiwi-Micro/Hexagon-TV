import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import Video from "./pages/Video";
import VideoViewer from "./pages/VideoViewer";
import movies from "./assets/API/videoDatabases/movies.json";
import documentaries from "./assets/API/videoDatabases/documentaries.json";
import tvshows from "./assets/API/videoDatabases/tvshows.json";
import NotFound from "./pages/404";
import "./assets/main.css";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Index />
					</Route>
					{movies.map((video) => {
						return (
							<Route path={"/" + video.urlName + ".html"}>
								<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={movies} rating={video.rating} description={video.description} />
							</Route>
						);
					})}
					{movies.map((video) => {
						return (
							<Route path={"/watch/" + video.urlName + ".html"}>
								<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
							</Route>
						);
					})}
					{documentaries.map((video) => {
						return (
							<Route path={"/" + video.urlName + ".html"}>
								<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={documentaries} rating={video.rating} description={video.description} />
							</Route>
						);
					})}
					{documentaries.map((video) => {
						return (
							<Route path={"/watch/" + video.urlName + ".html"}>
								<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
							</Route>
						);
					})}
					{tvshows.map((video) => {
						return (
							<Route path={"/" + video.urlName + ".html"}>
								<Video key={video.urlName} name={video.name} videoPage={"/watch/" + video.urlName + ".html"} thumbnailURL={video.thumbnailURL} db={tvshows} rating={video.rating} description={video.description} />
							</Route>
						);
					})}
					{tvshows.map((video) => {
						return (
							<Route path={"/watch/" + video.urlName + ".html"}>
								<VideoViewer key={video.urlName} name={video.name} videoURL={video.videoURL} previousPage={"/" + video.urlName + ".html"} />
							</Route>
						);
					})}
					<Route path="/*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

alert("This is a BATA site!");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
