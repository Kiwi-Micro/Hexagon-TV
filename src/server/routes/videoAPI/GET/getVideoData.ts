import { getVideos } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";
import { getQueryString } from "../../../utils/network";

async function getVideoDataEndpoint(req: any, res: any) {
	printEndpointReached(req, res);
	try {
		const results = await getVideos();
		return res.json(results);
	} catch (error) {
		console.error("Error fetching videos:", error);
		return res.status(500).json({ status: "server error" });
	}
}

export default getVideoDataEndpoint;
