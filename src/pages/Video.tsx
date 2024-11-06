import { useEffect, useState } from "react";
import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import VideoCard from "../components/VideoCard";
import CustomBreak from "../components/CustomBreak";
import "../assets/main.css";

interface ProductProps {
	name: string;
	videoPage: string;
	description: string;
	thumbnailURL: string;
	db: any;
	rating: string;
}

interface RatingInfo {
	rating: string;
	description: string;
}

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

function Video({ name, videoPage, description, thumbnailURL, db, rating }: ProductProps) {
	const [ratings, setRatings] = useState<RatingInfo[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const ratingsData = await getJSONData("https://raw.githubusercontent.com/Mooshay105/Hex-TV-Assests/refs/heads/main/API/ratings.json");

			setRatings(ratingsData || []);
		};

		fetchData();
	}, []);

	document.title = "Hexagon TV | " + name;
	const ratingInfo = ratings.find((item: any) => item.rating === rating);
	return (
		<div className="main">
			<GlobalNavBar />
			<div className="videoPage heroContainer">
				<img src={thumbnailURL} className="homePageHero" />
				<div className="homePageHeroInfo">
					<h1>{name}</h1>
					<p>{description}</p>
					<a className="homePageViewButton" href={videoPage}>
						Watch
					</a>
					<svg width="32" height="32" viewBox="0 0 16 16" style={{ fill: "#ffffff", marginLeft: "10px", position: "relative", top: "10px" }} xmlns="http://www.w3.org/2000/svg" onClick={() => alert("Hey There! This is not done yet!")}>
						<path d="M8 15.146c3.91 0 7.146-3.244 7.146-7.146 0-3.91-3.244-7.146-7.153-7.146C4.091.854.853 4.09.853 8c0 3.902 3.245 7.146 7.147 7.146zm0-1.19A5.926 5.926 0 012.052 8a5.92 5.92 0 015.941-5.955A5.943 5.943 0 0113.955 8 5.928 5.928 0 018 13.955zM5.33 8.588h2.075v2.087c0 .35.238.589.58.589.351 0 .597-.238.597-.589V8.59h2.087c.35 0 .589-.239.589-.582 0-.35-.238-.596-.589-.596H8.582V5.338c0-.365-.246-.603-.596-.603-.343 0-.581.245-.581.603V7.41H5.33c-.365 0-.603.246-.603.596 0 .343.245.582.603.582z" />
					</svg>
				</div>
				<div className="homePageHeroBlur" />
			</div>
			<CustomBreak height={1} />
			<h1 className="homePageVideosHeader">More In This Category</h1>
			<div className="homePageVideosList">
				{db
					.slice()
					.reverse()
					.map((video: any) => {
						return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
					})}
			</div>
			<div style={{ backgroundColor: "#101112" }}>
				<CustomBreak height={1} />
				<h2 className="homePageVideosHeader">About</h2>
				<div className="homePageVideosList">
					<div className="aboutVideoItem">
						<h3>{name}</h3>
						<p>{description}</p>
					</div>
					<div className="aboutVideoItem">
						<h3>{name} Age Rating:</h3>
						<h4>{rating}</h4>
						<p>{ratingInfo ? ratingInfo.description : "Rating not found"}</p>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Video;
