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
		if (username == null || id == null || id === "" || username === "") {
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
					<div className="accountPageHeader">
						<h1 className="accountPageUserInfoUsername">{username}</h1>
						<button className="accountPageLogoutButton" onClick={() => (window.location.href = "/Logout")}>
							Log Out
						</button>
					</div>
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
					<div className="dangerZoneContainer">
						<h2 className="dangerZoneHeader">Danger Zone</h2>
						<div className="dangerZone">
							<div className="dangerZoneItem">
								<div>
									<h3 className="dangerZoneItemHeader">Delete Account</h3>
									<p className="dangerZoneItemText">This will delete your account and all of your data. This action cannot be undone.</p>
								</div>
								<button className="dangerZoneItemButton" onClick={() => (window.location.href = "/deleteAccount")}>
									Delete Account
								</button>
							</div>
							<div className="dangerZoneItem">
								<div>
									<h3 className="dangerZoneItemHeader">Wipe Data</h3>
									<p className="dangerZoneItemText">This will delete all of your data. This action cannot be undone.</p>
								</div>
								<button className="dangerZoneItemButton" onClick={() => (window.location.href = "/wipeData")}>
									Wipe Data
								</button>
							</div>
							<div className="dangerZoneItem">
								<div>
									<h3 className="dangerZoneItemHeader">Change Password</h3>
									<p className="dangerZoneItemText">This will change your password.</p>
								</div>
								<button className="dangerZoneItemButton" onClick={() => (window.location.href = "/changePassword")}>
									Change Password
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Account;
