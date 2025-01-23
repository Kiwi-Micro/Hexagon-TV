import { useUser, useSession } from "@clerk/clerk-react";

function setUserInfo() {
	const {
		isSignedIn: isUserSignedIn,
		user,
		isLoaded: isUserLoaded,
	} = useUser();
	const {
		isLoaded: isSessionLoaded,
		session,
		isSignedIn: isSessionSignedIn,
	} = useSession();
	if (
		!isUserSignedIn ||
		!isSessionSignedIn ||
		!isUserLoaded ||
		!isSessionLoaded
	) {
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

export default setUserInfo;
