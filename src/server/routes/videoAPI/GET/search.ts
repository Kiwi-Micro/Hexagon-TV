import { getVideosForSearch } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";
import { getQueryString } from "../../../utils/network";

async function searchVideoEndpoint(req: any, res: any) {
	printEndpointReached(req, res);
	try {
		const results = await getVideosForSearch(
			getQueryString(req.url, "query") as string,
		);
		return res.json(results);
	} catch (error) {
		console.error("Error fetching videos:", error);
		return res.status(500).json({ status: "server error" });
	}
}

export default searchVideoEndpoint;
