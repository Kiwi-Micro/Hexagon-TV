import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Add your Clerk Publishable Key to the .env.local file");
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
