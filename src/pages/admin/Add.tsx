import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import CustomBreak from "../../components/CustomBreak";
import { useState } from "react";
import { UploadButton } from "../../utils/uploadthing";
import { postJSONData } from "../../utils/api";

/* TODO: Clean Up */

function Add() {
	document.title = "Hexagon TV Add | Add Video";

	const [thumbnailURL, setThumbnailURL] = useState("");
	const [videoURL, setVideoURL] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [urlName, setUrlName] = useState("");
	const [ageRating, setAgeRating] = useState("");
	const [category, setCategory] = useState("");
	const [alert, setAlert] = useState("");

	async function handleSubmit() {
		const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL;
		const VITE_PUBLIC_CLERK_SIGN_IN_URL = import.meta.env.VITE_PUBLIC_CLERK_SIGN_IN_URL;
		if (
			!name ||
			!description ||
			!category ||
			!thumbnailURL ||
			!videoURL ||
			!urlName ||
			!ageRating
		) {
			setAlert("Please fill out all fields!");
			return;
		}
		const data = await postJSONData(`${VITE_PUBLIC_API_URL}/videoAPI/add`, {
			userId: localStorage.getItem("userId") || "",
			sessionId: localStorage.getItem("sessionId") || "",
			name,
			description,
			category,
			thumbnailURL,
			videoURL,
			urlName,
			ageRating,
		});
		if (data.status !== "success") {
			window.location.href = VITE_PUBLIC_CLERK_SIGN_IN_URL;
			return;
		}
		window.location.href = "/admin";
	}

	return (
		<div className="main">
			<GlobalNavBar />
			<CustomBreak height={1} />
			<div className="center">
				<div className="addVideoPage">
					<h1 style={{ textAlign: "center" }}>Add A Video</h1>
					{alert && <p style={{ color: "red" }}>{alert}</p>}
					<div className="addVideoPageForm">
						<h2 style={{ textAlign: "center", marginBottom: "10px" }}>
							Upload Thumbnail
						</h2>
						<UploadButton
							endpoint="thumbnail"
							onUploadError={(error) => {
								console.error("ERROR:", error, error.cause);
							}}
							onClientUploadComplete={(data: any) => {
								setThumbnailURL(data[0].url);
							}}
							headers={{
								sessionId: localStorage.getItem("sessionId") || "",
								userId: localStorage.getItem("userId") || "",
							}}
						/>
						<h2 style={{ textAlign: "center", marginBottom: "10px" }}>Upload Video</h2>
						<UploadButton
							endpoint="video"
							onUploadError={(error) => {
								console.error("ERROR:", error, error.cause);
							}}
							onClientUploadComplete={(data: any) => {
								setVideoURL(data[0].url);
							}}
							headers={{
								sessionId: localStorage.getItem("sessionId") || "",
								userId: localStorage.getItem("userId") || "",
							}}
						/>
						<input
							className="addVideoInput"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							className="addVideoInput"
							type="text"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<input
							className="addVideoInput"
							type="text"
							placeholder="urlName"
							value={urlName}
							onChange={(e) => setUrlName(e.target.value)}
						/>
						<input
							className="addVideoInput"
							type="text"
							placeholder="ageRating"
							value={ageRating}
							onChange={(e) => setAgeRating(e.target.value)}
						/>
						{/* dropdown */}
						<select
							id="category"
							value={category || "none"}
							onChange={(e) => setCategory(e.target.value)}
							className="addVideoDropdown"
						>
							<option value="none" disabled hidden>
								-- Select Category --
							</option>
							<option value="movies">Movie</option>
							<option value="tvshows">TV Show</option>
							<option value="documentaries">Documentaries</option>
						</select>
						<button className="addVideoButton" onClick={() => handleSubmit()}>
							Submit
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Add;
