import { useUser, useSession } from "@clerk/clerk-react";
import { Video } from "./types";

function setUserInfo() {
	const { isSignedIn: isUserSignedIn, user, isLoaded: isUserLoaded } = useUser();
	const {
		isLoaded: isSessionLoaded,
		session,
		isSignedIn: isSessionSignedIn,
	} = useSession();
	if (!isUserSignedIn || !isSessionSignedIn || !isUserLoaded || !isSessionLoaded) {
		localStorage.setItem("username", "");
		localStorage.setItem("sessionId", "");
		localStorage.setItem("userId", "");
		return false;
	}
	const username = user.username || "";
	const sessionId = session.id || "";
	const userId = user.id || "";

	localStorage.setItem("username", username);
	localStorage.setItem("sessionId", sessionId);
	localStorage.setItem("userId", userId);

	return true;
}

let watchlist: Video[] = [];

function setWatchlist(watchlistData: Video[]) {
	watchlist = watchlistData;
}

function getUserWatchlist() {
	return watchlist;
}

export { setUserInfo, setWatchlist, getUserWatchlist };
