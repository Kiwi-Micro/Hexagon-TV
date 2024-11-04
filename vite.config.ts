import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	esbuild: {
		target: "esnext", // or set to a more recent target such as 'chrome89' or 'firefox89'
	},
});
