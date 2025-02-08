import { addVideo, adminAuth } from "../../../utils/database";
import { printEndpointReached } from "../../../utils/messages";

async function addVideoEndpoint(req: any, res: any) {
	printEndpointReached(req, res);
	const reqBody = await req.json();
	if (await adminAuth(reqBody.sessionId, reqBody.userId)) {
		try {
			const status = await addVideo(reqBody);
			if (status) {
				return res.json({ status: "success" });
			} else {
				return res.json({ status: "server error" }, 500);
			}
		} catch (error) {
			console.error("Error adding video:", error);
			return res.json({ status: "server srror" }, 500);
		}
	} else {
		return res.json({ status: "invalid credentials" }, 403);
	}
}

export default addVideoEndpoint;
