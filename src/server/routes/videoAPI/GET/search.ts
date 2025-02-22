import { getVideosForSearch } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";
import { getQueryString } from "../../../utils/network";

async function searchEndpoint(req: any, res: any) {
	printEndpointReached(req);
	try {
		const results = await getVideosForSearch(getQueryString(req.url, "query") as string);
		return res.json(results);
	} catch (error) {
		console.error("Error fetching videos:", error);
		return res.json({ status: "server error" }, 500);
	}
}

export default searchEndpoint;
