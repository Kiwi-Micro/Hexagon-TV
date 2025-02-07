import { createClient } from "@libsql/client";

const BUN_TURSO_DB_URL = process.env.BUN_PUBLIC_TURSO_DB_URL || "";
const BUN_TURSO_DB_AUTH_TOKEN_R =
	process.env.BUN_TURSO_DB_AUTH_TOKEN_R || "";
const BUN_TURSO_DB_AUTH_TOKEN_RW =
	process.env.BUN_TURSO_DB_AUTH_TOKEN_RW || "";

const tursoDBConnection_R = createClient({
	url: BUN_TURSO_DB_URL,
	authToken: BUN_TURSO_DB_AUTH_TOKEN_R,
});

const tursoDBConnection_RW = createClient({
	url: BUN_TURSO_DB_URL,
	authToken: BUN_TURSO_DB_AUTH_TOKEN_RW,
});

function getDbConnection(readOnly: boolean) {
	if (readOnly) {
		return tursoDBConnection_R;
	} else {
		return tursoDBConnection_RW;
	}
}

export { getDbConnection };
