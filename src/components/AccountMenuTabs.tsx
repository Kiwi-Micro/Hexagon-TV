import { renderVideoCard } from "../utils/renders";
import { getUserWatchlist } from "../utils/userInfo";

function WatchlistDotIcon() {
	return (
		<svg className="cl-navbarButtonIcon cl-navbarButtonIcon__security cl-internal-141wpcl">
			<path d="M8 15.146c3.91 0 7.146-3.244 7.146-7.146 0-3.91-3.244-7.146-7.153-7.146C4.091.854.853 4.09.853 8c0 3.902 3.245 7.146 7.147 7.146zm0-1.19A5.926 5.926 0 012.052 8a5.92 5.92 0 015.941-5.955A5.943 5.943 0 0113.955 8 5.928 5.928 0 018 13.955zM5.33 8.588h2.075v2.087c0 .35.238.589.58.589.351 0 .597-.238.597-.589V8.59h2.087c.35 0 .589-.239.589-.582 0-.35-.238-.596-.589-.596H8.582V5.338c0-.365-.246-.603-.596-.603-.343 0-.581.245-.581.603V7.41H5.33c-.365 0-.603.246-.603.596 0 .343.245.582.603.582z" />
		</svg>
	);
}

function AccountWatchlistTab() {
	const watchlist = getUserWatchlist();

	return (
		<>
			<div>
				<h1
					style={{
						color: "#212126",
						fontSize: "1.0625rem",
						margin: "0 0 1rem",
						fontWeight: 700,
						lineHeight: "1.41176",
					}}
				>
					Watchlist
				</h1>
				{watchlist.length > 0 && watchlist[0].id !== 0 ? (
					<div
						className="accountMenuVideosList"
						style={{ borderTop: "1px solid rgba(0, 0, 0, 0.07)" }}
					>
						{renderVideoCard(watchlist)}
					</div>
				) : (
					<div style={{ borderTop: "1px solid rgba(0, 0, 0, 0.07)" }}>
						<h4 style={{ textAlign: "center", marginTop: "10px" }}>
							You have no videos in your watchlist!
						</h4>
					</div>
				)}
			</div>
		</>
	);
}

export { AccountWatchlistTab, WatchlistDotIcon };
