import VideoCard from "../components/VideoCard";
import { Video } from "./types";
import VideoPage from "../pages/Video";
import VideoViewer from "../pages/VideoViewer";
import { Route } from "react-router-dom";
import Edit from "../pages/admin/Edit";

function renderVideoCard(db: any) {
	return db
		.slice()
		.reverse()
		.map((video: any) => {
			return (
				<VideoCard
					key={video.urlName}
					name={video.name}
					videoLink={`${video.urlName}`}
					thumbnailURL={video.thumbnailURL}
				/>
			);
		});
}

function renderVideoRoutes(db: Video[], isViewer?: boolean, watchlist?: any) {
	if (isViewer) {
		return db.map((video: Video) => (
			<Route
				key={video.urlName}
				path={`/watch/${video.urlName}`}
				element={
					<VideoViewer
						key={video.urlName}
						name={video.name}
						videoURL={video.videoURL}
						previousPage={`/${video.urlName}`}
					/>
				}
			/>
		));
	}
	return db.map((video: Video) => (
		<Route
			key={video.urlName}
			path={`/${video.urlName}`}
			element={
				<VideoPage key={video.urlName} videoInfo={video} db={db} watchlist={watchlist} />
			}
		/>
	));
}

function renderAdminEditPages(db: Video[]) {
	return db.map((video: Video) => (
		<Route
			key={video.urlName}
			path={`/admin/edit/${video.urlName}`}
			element={<Edit key={video.urlName} videoData={video} />}
		/>
	));
}

export { renderVideoCard, renderVideoRoutes, renderAdminEditPages };
