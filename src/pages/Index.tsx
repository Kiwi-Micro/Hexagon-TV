import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import VideoCard from "../components/VideoCard";
import CustomBreak from "../components/CustomBreak";
import "../assets/main.css";

interface IndexProps {
	watchlist: any;
	continueWatching: any;
	movies: any;
	documentaries: any;
	tvshows: any;
}

function renderVideoCard(db: any) {
	return db
		.slice()
		.reverse()
		.map((video: any) => {
			return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
		});
}

function Index({ watchlist, continueWatching, movies, documentaries, tvshows }: IndexProps) {
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
				{continueWatching.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Continue Watching</h1>
						<div className="homePageVideosList">{renderVideoCard(continueWatching)}</div>
					</>
				) : null}
				{watchlist.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Watchlist</h1>
						<div className="homePageVideosList">{renderVideoCard(watchlist)}</div>
					</>
				) : null}
				{movies.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Movies</h1>
						<div className="homePageVideosList">{renderVideoCard(movies)}</div>
					</>
				) : null}
				{documentaries.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">Documentaries</h1>
						<div className="homePageVideosList">{renderVideoCard(documentaries)}</div>
					</>
				) : null}
				{tvshows.length > 0 ? (
					<>
						<h1 className="homePageVideosHeader">TV Shows</h1>
						<div className="homePageVideosList">{renderVideoCard(tvshows)}</div>
					</>
				) : null}
				<CustomBreak height={1} />
				<GlobalFooter />
			</div>
		</div>
	);
}

export default Index;
