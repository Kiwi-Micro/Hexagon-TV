import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = await fetch("/API/keys/publicKey").then((res) =>
	res.json(),
);

if (!PUBLISHABLE_KEY) {
	throw new Error("Add your Clerk Publishable Key to the .env file");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ClerkProvider
		publishableKey={PUBLISHABLE_KEY}
		afterSignOutUrl="/"
		signInForceRedirectUrl="/"
		signUpForceRedirectUrl="/"
	>
		<App />
	</ClerkProvider>,
);
