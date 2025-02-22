import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import CustomBreak from "../components/CustomBreak";
import VideoCarousel from "../components/VideoCarousel";
import type { Video } from "../../types";
import hero from "../assets/hero.mp4";
import heroPlaceholderImage from "../assets/img/heroPlaceholder.png";
import { getUserWatchlist } from "../utils/userInfo";

interface IndexProps {
	movies: Video[];
	documentaries: Video[];
	tvshows: Video[];
}

function Index({ movies, documentaries, tvshows }: IndexProps) {
	document.title = "Hexagon TV | Home";
	const watchlist = getUserWatchlist();

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
					poster={heroPlaceholderImage}
				/>
				<div className="homePageHeroInfo">
					<h1>Cool New Shows Coming To You!</h1>
					<p>Well Some Day...</p>
					<a className="homePageViewButton" href="#videos">
						View Shows
					</a>
				</div>
				<div className="homePageHeroBlur" />
			</div>
			<CustomBreak height={1} />
			<div id="videos" className="homePageVideos">
				<VideoCarousel db={watchlist} title="Watchlist" />
				<VideoCarousel db={movies} title="Movies" />
				<VideoCarousel db={documentaries} title="Documentaries" />
				<VideoCarousel db={tvshows} title="TV Shows" />
				<CustomBreak height={1} />
				<GlobalFooter />
			</div>
		</div>
	);
}

export default Index;
