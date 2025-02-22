import { createClient } from "@libsql/client";
import { createClerkClient } from "@clerk/backend";
import { UTApi } from "uploadthing/server";

// Get the config values.
const TURSO_DB_URL = process.env.BUN_PUBLIC_TURSO_DB_URL || "";
const TURSO_DB_AUTH_TOKEN_R = process.env.BUN_TURSO_DB_AUTH_TOKEN_R || "";
const TURSO_DB_AUTH_TOKEN_RW = process.env.BUN_TURSO_DB_AUTH_TOKEN_RW || "";
const UPLOADTHING_TOKEN = process.env.BUN_UPLOADTHING_TOKEN || "";
const CLERK_SECRET_KEY = process.env.BUN_CLERK_SECRET_KEY || "";

// Create an instance of the UploadThing API.
const utapi = new UTApi({
	token: UPLOADTHING_TOKEN,
});

// Create an instance of the Clerk client.
const clerkClient = createClerkClient({
	secretKey: CLERK_SECRET_KEY,
});

const TURSO_DB_CONNECTION_R = createClient({
	url: TURSO_DB_URL,
	authToken: TURSO_DB_AUTH_TOKEN_R,
});

const TURSO_DB_CONNECTION_RW = createClient({
	url: TURSO_DB_URL,
	authToken: TURSO_DB_AUTH_TOKEN_RW,
});

/**
 * Gets the database connection.
 * @param readOnly whether to use the read-only connection or the read-write connection.
 * @returns The database connection.
 */

function getDbConnection(readOnly: boolean) {
	if (readOnly) {
		return TURSO_DB_CONNECTION_R;
	} else {
		return TURSO_DB_CONNECTION_RW;
	}
}

export { getDbConnection, clerkClient, utapi };
