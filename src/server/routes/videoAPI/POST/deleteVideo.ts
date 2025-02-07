import { deleteVideo, adminAuth } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";

async function deleteVideoEndpoint(req: any, res: any) {
	printEndpointReached(req, res);
	if (await adminAuth(req.body.sessionId, req.body.userId)) {
		try {
			const status = await deleteVideo(req.body);
			if (status) {
				return res.json({ status: "success" });
			} else {
				return res.status(409).json({ status: "server error" });
			}
		} catch (error) {
			console.error("Error deleting video:", error);
			return res.status(500).json({ status: "server srror" });
		}
	} else {
		return res.status(403).json({ status: "invalid credentials" });
	}
}

export default deleteVideoEndpoint;
