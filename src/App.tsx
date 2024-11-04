import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import Video from "./pages/Video";
import VideoViewer from "./pages/VideoViewer";
import NotFound from "./pages/404";
import "./assets/main.css";

async function getJSONData(url: string) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch JSON:", error);
	}
}

// Usage
const url = "https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/continueWatching.json";
getJSONData(url).then((data) => {
	console.log(data);
});

let movies = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/movies.json");
let documentaries = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/documentaries.json");
let tvshows = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/tvshows.json");

function App() {
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
					<Route path="/*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
