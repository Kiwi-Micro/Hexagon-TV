import index from "../../index.html";
import getWatchlistEndpoint from "./routes/userAPI/GET/watchlist";
import addToWatchlistEndpoint from "./routes/userAPI/POST/addToWatchlist";
import removeFromWatchlistEndpoint from "./routes/userAPI/POST/removeFromWatchlist";
import getVideoDataEndpoint from "./routes/videoAPI/GET/getVideoData";
import searchVideoEndpoint from "./routes/videoAPI/GET/search";
import addVideoEndpoint from "./routes/videoAPI/POST/addVideo";
import deleteVideoEndpoint from "./routes/videoAPI/POST/deleteVideo";
import updateVideoEndpoint from "./routes/videoAPI/POST/updateVideo";

const BUN_PUBLIC_CLERK_PUBLISHABLE_KEY =
	process.env.BUN_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

const BUN_PUBLIC_CLERK_SIGN_IN_URL = process.env.BUN_PUBLIC_CLERK_SIGN_IN_URL || "";

Bun.serve({
	static: {
		"/": index,
		"/search": index,
		"/video/*": index,
		"/watch/*": index,
		"/admin": index,
		"/admin/": index,
		"/admin/add": index,
		"/admin/edit/*": index,
		"/admin/delete/*": index,
	},

	async fetch(req) {
		if (req.url.includes("/API/keys/publicKey")) {
			return Response.json(BUN_PUBLIC_CLERK_PUBLISHABLE_KEY);
		} else if (req.url.includes("/API/keys/signInURL")) {
			return Response.json(BUN_PUBLIC_CLERK_SIGN_IN_URL);
		} else if (req.url.includes("/API/userAPI/getWatchlist")) {
			return getWatchlistEndpoint(req, Response);
		} else if (req.url.includes("/API/userAPI/addToWatchlist")) {
			return addToWatchlistEndpoint(req, Response);
		} else if (req.url.includes("/API/userAPI/deleteFromWatchlist")) {
			return removeFromWatchlistEndpoint(req, Response);
		} else if (req.url.includes("/API/videoAPI/getVideoData")) {
			return getVideoDataEndpoint(req, Response);
		} else if (req.url.includes("/API/videoAPI/search")) {
			return searchVideoEndpoint(req, Response);
		} else if (req.url.includes("/API/videoAPI/addVideo")) {
			return addVideoEndpoint(req, Response);
		} else if (req.url.includes("/API/videoAPI/deleteVideo")) {
			return deleteVideoEndpoint(req, Response);
		} else if (req.url.includes("/API/videoAPI/updateVideo")) {
			return updateVideoEndpoint(req, Response);
		} else {
			// Return 404 for unmatched routes
			return new Response("Not Found!", { status: 404 });
		}
	},
});
