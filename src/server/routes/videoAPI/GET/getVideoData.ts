import { getVideos } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";

async function getVideoDataEndpoint(req: any, res: any) {
	printEndpointReached(req);
	try {
		const results = await getVideos();
		return res.json(results);
	} catch (error) {
		console.error("Error fetching videos:", error);
		return res.json({ status: "server error" }, 500);
	}
}

export default getVideoDataEndpoint;
