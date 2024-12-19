import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import CustomBreak from "../components/CustomBreak";
import VideoCarousel from "../components/VideoCarousel";
import hero from "../assets/hero.mp4";
import "../assets/main.css";

interface IndexProps {
	watchlist: any;
	movies: any;
	documentaries: any;
	tvshows: any;
}

function Index({
	watchlist,
	movies,
	documentaries,
	tvshows,
}: IndexProps) {
	document.title = "Hexagon TV | Home";
	return (
		<div className="main">
			<GlobalNavBar />
			<div className="heroContainer">
				<video
					src={hero}
					muted
					autoPlay
					loop
					className="homePageHero"
				/>
				<div className="homePageHeroInfo">
					<h1>Cool New Shows Coming To You!</h1>
					<p>
						How can we keep this free? Well that
						is a good question, We do not know
						either.
					</p>
					<a
						className="homePageViewButton"
						href="#videos"
					>
						View Shows
					</a>
				</div>
				<div className="homePageHeroBlur" />
			</div>
			<CustomBreak height={1} />
			<div id="videos" className="homePageVideos">
				<VideoCarousel
					db={watchlist}
					title="Watchlist"
				/>
				<VideoCarousel
					db={movies}
					title="Movies"
				/>
				<VideoCarousel
					db={documentaries}
					title="Documentaries"
				/>
				<VideoCarousel
					db={tvshows}
					title="TV Shows"
				/>
				<CustomBreak height={1} />
				<GlobalFooter />
			</div>
		</div>
	);
}

export default Index;
