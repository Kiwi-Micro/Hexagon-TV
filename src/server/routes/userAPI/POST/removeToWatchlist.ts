import { deleteFromWatchlist } from "../../../utils/watchlist";
import { auth } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";

async function deleteFromWatchlistEndpoint(req: any, res: any) {
	printEndpointReached(req, res);
	const reqBody = await req.json();
	if (await auth(reqBody.sessionId, reqBody.userId, reqBody.username)) {
		try {
			const status = await deleteFromWatchlist(reqBody);
			if (status) {
				return res.json({ status: "success" });
			} else {
				return res.status(409).json({ status: "server error" });
			}
		} catch (error) {
			console.error("Error removing from watchlist:", error);
			return res.status(500).json({ status: "server srror" });
		}
	} else {
		return res.status(403).json({ status: "invalid credentials" });
	}
}

export default deleteFromWatchlistEndpoint;
