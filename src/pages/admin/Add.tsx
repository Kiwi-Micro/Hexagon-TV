import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import CustomBreak from "../../components/CustomBreak";
import { useState } from "react";
import { UploadButton } from "../../utils/uploadthing";
import { addVideo } from "../../utils/videoManipulation";
import { Video } from "../../utils/types";

function Add() {
	document.title = "Hexagon TV Add | Add Video";

	const [video, setVideo] = useState<Video>({
		id: 0,
		name: "",
		description: "",
		category: "",
		thumbnailURL: "",
		videoURL: "",
		date: "",
		ageRating: "",
		ageRatingInfo: "",
		urlName: "",
	});
	const [alert, setAlert] = useState("");

	async function handleAddVideo() {
		if (
			!video.name ||
			!video.description ||
			!video.category ||
			!video.thumbnailURL ||
			!video.videoURL
		) {
			setAlert("Please fill out all fields!");
			return;
		}
		addVideo(video);
	}

	return (
		<div className="main">
			<GlobalNavBar />
			<CustomBreak height={2} />
			<div className="centerHorizontal">
				<div className="addVideoPage">
					<h1 style={{ textAlign: "center" }}>Add A Video</h1>
					{alert && <p style={{ color: "red" }}>{alert}</p>}
					<div className="addVideoPageForm">
						<h2 style={{ textAlign: "center", marginBottom: "10px" }}>
							Upload Thumbnail
						</h2>
						{video.thumbnailURL ? (
							<img src={video.thumbnailURL} alt="Thumbnail" className="addVideoPreview" />
						) : null}
						<UploadButton
							endpoint="thumbnail"
							onUploadError={(error) => {
								console.error("ERROR:", error, error.cause);
							}}
							onClientUploadComplete={(data: any) => {
								setVideo((prevState: any) => ({
									...prevState,
									thumbnailURL: data[0].url,
								}));
							}}
							headers={{
								sessionId: localStorage.getItem("sessionId") || "",
								userId: localStorage.getItem("userId") || "",
							}}
						/>
						<h2 style={{ textAlign: "center", marginBottom: "10px" }}>Upload Video</h2>
						{video.videoURL ? (
							<video src={video.videoURL} controls className="addVideoPreview" />
						) : null}
						<UploadButton
							endpoint="video"
							onUploadError={(error) => {
								console.error("ERROR:", error, error.cause);
							}}
							onClientUploadComplete={(data: any) => {
								setVideo((prevState: any) => ({ ...prevState, videoURL: data[0].url }));
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
							value={video.name}
							onChange={(e) =>
								setVideo((prevState: any) => ({ ...prevState, name: e.target.value }))
							}
						/>
						<input
							className="addVideoInput"
							type="text"
							placeholder="Description"
							value={video.description}
							onChange={(e) =>
								setVideo((prevState: any) => ({
									...prevState,
									description: e.target.value,
								}))
							}
						/>
						<input
							className="addVideoInput"
							type="text"
							placeholder="urlName"
							value={video.urlName}
							onChange={(e) =>
								setVideo((prevState: any) => ({ ...prevState, urlName: e.target.value }))
							}
						/>
						<input
							className="addVideoInput"
							type="text"
							placeholder="ageRating"
							value={video.ageRating}
							onChange={(e) =>
								setVideo((prevState: any) => ({
									...prevState,
									ageRating: e.target.value,
								}))
							}
						/>
						<select
							id="category"
							value={video.category || "none"}
							onChange={(e) =>
								setVideo((prevState: any) => ({ ...prevState, category: e.target.value }))
							}
							className="addVideoDropdown"
						>
							<option value="none" disabled hidden>
								-- Select Category --
							</option>
							<option value="movies">Movie</option>
							<option value="tvshows">TV Show</option>
							<option value="documentaries">Documentaries</option>
						</select>
						<button className="addVideoButton" onClick={() => handleAddVideo()}>
							Add
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Add;
