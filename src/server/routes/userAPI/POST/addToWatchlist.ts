import { addToWatchlist } from "../../../utils/watchlist";
import { auth } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";

async function addToWatchlistEndpoint(req: any, res: any) {
	printEndpointReached(req, res);
	if (await auth(req.body.sessionId, req.body.userId, req.body.username)) {
		try {
			const status = await addToWatchlist(req.body);
			if (status) {
				return res.json({ status: "success" });
			} else {
				return res.status(409).json({ status: "server error" });
			}
		} catch (error) {
			console.error("Error adding to watchlist:", error);
			return res.status(500).json({ status: "server srror" });
		}
	} else {
		return res.status(403).json({ status: "invalid credentials" });
	}
}

export default addToWatchlistEndpoint;
