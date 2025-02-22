import { getWatchlist } from "../../../utils/watchlist";
import { printEndpointReached } from "../../../utils/messages";
import { getQueryString } from "../../../utils/network";

async function getWatchlistEndpoint(req: any, res: any) {
	printEndpointReached(req);
	try {
		const results = await getWatchlist(getQueryString(req.url, "username") as string);
		return res.json(results);
	} catch (error) {
		console.error("Error fetching watchlist:", error);
		return res.json({ status: "server error" }, 500);
	}
}

export default getWatchlistEndpoint;
