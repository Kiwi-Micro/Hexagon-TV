import {
	generateReactHelpers,
	generateUploadButton,
	generateUploadDropzone,
	type GenerateTypedHelpersOptions,
} from "@uploadthing/react";

import type { OurFileRouter } from "./types";

const initOpts = {
	url: import.meta.env.VITE_PUBLIC_API_URL,
} satisfies GenerateTypedHelpersOptions;

export const UploadButton = generateUploadButton<OurFileRouter>(initOpts);
export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts);

export const { useUploadThing } = generateReactHelpers<OurFileRouter>(initOpts);
