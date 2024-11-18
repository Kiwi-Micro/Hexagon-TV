import { useEffect } from "react";
import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import VideoCard from "../components/VideoCard";

interface AccountDataProps {
	continueWatching: any;
	watchlist: any;
}

function Account({ continueWatching, watchlist }: AccountDataProps) {
	document.title = "Hexagon TV | Account";

	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");

	useEffect(() => {
		if (username == null || id == null) {
			window.location.href = "/login";
		}
	}, []);

	function renderVideoCard(db: any) {
		return db.slice().map((video: any) => {
			return <VideoCard key={video.urlName} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
		});
	}

	return (
		<div className="main">
			<GlobalNavBar />
			<div className="accountPage" style={{ display: "flex", flexDirection: "row" }}>
				<div className="accountPageUserInfo">
					<h1 className="accountPageUserInfoUsername">{username}</h1>
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
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Account;
