/**
 * Log that the endpoint was reached.
 * @param res The response object
 */

function printEndpointReached(req: any) {
	console.log(`${new Date().toString().slice(4, 24)} GMT+0000: ${req.method} ${req.url}`);
}

export { printEndpointReached };
