import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import hero from "../assets/hero.mp4";
import VideoCard from "../components/VideoCard";
import CustomBreak from "../components/CustomBreak";
import "../assets/main.css";

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

let watchlistdb = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/watchlist.json");
let continueWatchingdb = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/continueWatching.json");
let moviesdb = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/movies.json");
let documentariesdb = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/documentaries.json");
let tvshowsdb = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/videoDatabases/tvshows.json");

function Index() {
	document.title = "Hexagon TV | Home";

	return (
		<div className="main">
			<GlobalNavBar />
			<div className="heroContainer">
				<video src={hero} muted autoPlay loop className="homePageHero" />
				<div className="homePageHeroInfo">
					<h1>Cool New Shows Coming To You!</h1>
					<p>How can we keep this free? Well that is a good question, We do not know either.</p>
					<a className="homePageViewButton" href="#videos">
						View Shows
					</a>
				</div>
				<div className="homePageHeroBlur" />
			</div>
			<CustomBreak height={1} />
			<div id="videos" className="homePageVideos">
				{continueWatchingdb.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Continue Watching</h1>
						<div className="homePageVideosList">
							{continueWatchingdb
								.slice()
								.reverse()
								.map((video: any) => {
									return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
								})}
						</div>
					</>
				) : null}
				{watchlistdb.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Watchlist</h1>
						<div className="homePageVideosList">
							{watchlistdb
								.slice()
								.reverse()
								.map((video: any) => {
									return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
								})}
						</div>
					</>
				) : null}
				{moviesdb.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Movies</h1>
						<div className="homePageVideosList">
							{moviesdb
								.slice()
								.reverse()
								.map((video: any) => {
									return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
								})}
						</div>
					</>
				) : null}
				{documentariesdb.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Documentaries</h1>
						<div className="homePageVideosList">
							{documentariesdb
								.slice()
								.reverse()
								.map((video: any) => {
									return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
								})}
						</div>
					</>
				) : null}
				{tvshowsdb.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">TV Shows</h1>
						<div className="homePageVideosList">
							{tvshowsdb
								.slice()
								.reverse()
								.map((video: any) => {
									return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
								})}
						</div>
					</>
				) : null}
				<CustomBreak height={1} />
				<GlobalFooter />
			</div>
		</div>
	);
}

export default Index;
