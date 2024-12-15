import { useEffect } from "react";
import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import VideoCard from "../components/VideoCard";

interface AccountDataProps {
	watchlist: any;
}

function Account({ watchlist }: AccountDataProps) {
	document.title = "Hexagon TV | Account";

	const username = localStorage.getItem("username");
	const sessionId = localStorage.getItem("sessionId");

	useEffect(() => {
		if (username == null || sessionId == null || sessionId === "" || username === "") {
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
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h1 className="accountPageUserInfoHeader">Settings</h1>
							<h3 className="accountPageUserInfoUsername">{username}</h3>
						</div>
					</div>
					<div id="videos" className="homePageVideos">
						{watchlist.length > 0 ? (
							<>
								<h1 className="homePageVideosHeader">Watchlist</h1>
								<div className="accountPageVideosList">{renderVideoCard(watchlist)}</div>
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
							<div className="dangerZoneItem">
								<div>
									<h3 className="dangerZoneItemHeader">Log Out</h3>
									<p className="dangerZoneItemText">This will log you out of your account.</p>
								</div>
								<button className="dangerZoneItemButton" onClick={() => (window.location.href = "/logout")}>
									Log Out
								</button>
							</div>
							<div className="dangerZoneItem">
								<div>
									<h3 className="dangerZoneItemHeader">Log Out All Devices</h3>
									<p className="dangerZoneItemText">This will log you out of all devices. This action cannot be undone.</p>
								</div>
								<button className="dangerZoneItemButton" onClick={() => (window.location.href = "/logoutAll")}>
									Log Out All Devices
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
