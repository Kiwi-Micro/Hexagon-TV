import { addToWatchlist } from "../../../utils/watchlist";
import { auth } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";

async function addToWatchlistEndpoint(req: any, res: any) {
	printEndpointReached(req);
	const body = await req.json();
	if (await auth(body.sessionId, body.userId, body.username)) {
		try {
			const status = await addToWatchlist(body);
			if (status) {
				return res.json({ status: "success" });
			} else {
				return res.json({ status: "server error" }, 500);
			}
		} catch (error) {
			console.error("Error adding to watchlist:", error);
			return res.json({ status: "server srror" }, 500);
		}
	} else {
		return res.json({ status: "invalid credentials" }, 403);
	}
}

export default addToWatchlistEndpoint;
