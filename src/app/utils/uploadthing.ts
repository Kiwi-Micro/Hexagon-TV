import {
	generateReactHelpers,
	generateUploadButton,
	generateUploadDropzone,
	type GenerateTypedHelpersOptions,
} from "@uploadthing/react";

import type { OurFileRouter } from "../../server/routes/videoAPI/POST/uploadFiles";

const initOpts = {
	url: "",
} satisfies GenerateTypedHelpersOptions;

export const UploadButton = generateUploadButton<OurFileRouter>(initOpts);
export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts);

export const { useUploadThing } = generateReactHelpers<OurFileRouter>(initOpts);
