import { useEffect, useState } from "react";
import { getJSONData } from "../utils/api";
import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import VideoCard from "../components/VideoCard";
import CustomBreak from "../components/CustomBreak";
import "../assets/main.css";

function Index() {
	const [watchlistdb, setWatchlistdb] = useState([]);
	const [continueWatchingdb, setContinueWatchingdb] = useState([]);
	const [moviesdb, setMoviesdb] = useState([]);
	const [documentariesdb, setDocumentariesdb] = useState([]);
	const [tvshowsdb, setTvShowsdb] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			// To Fill When API is Ready
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
	document.title = "Hexagon TV | Home";
	return (
		<div className="main">
			<GlobalNavBar />
			<div className="heroContainer">
				<video src="https://utfs.io/a/javgoq6sm5/7cipGy3KpezYU3eEZ16rmn8iRqzsZA90JeWTS3bEtBwXVjYx" muted autoPlay loop className="homePageHero" />
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
