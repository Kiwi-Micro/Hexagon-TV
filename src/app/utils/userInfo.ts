import { useUser, useSession } from "@clerk/clerk-react";
import type { Video } from "../../types";

let watchlist: Video[] = [];
let username = "";
let sessionId = "";
let userId = "";

function setUserInfo() {
	const { isSignedIn: isUserSignedIn, user, isLoaded: isUserLoaded } = useUser();
	const {
		isLoaded: isSessionLoaded,
		session,
		isSignedIn: isSessionSignedIn,
	} = useSession();
	if (!isUserSignedIn || !isSessionSignedIn || !isUserLoaded || !isSessionLoaded) {
		username = "";
		sessionId = "";
		userId = "";
		return false;
	}
	username = user.username || "";
	sessionId = session.id || "";
	userId = user.id || "";

	return true;
}

function setWatchlist(watchlistData: Video[]) {
	watchlist = watchlistData;
}

function getUsername() {
	return username;
}

function getSessionId() {
	return sessionId;
}

function getUserId() {
	return userId;
}

function getUserWatchlist() {
	return watchlist;
}

export {
	setUserInfo,
	setWatchlist,
	getUserWatchlist,
	getUsername,
	getSessionId,
	getUserId,
};
