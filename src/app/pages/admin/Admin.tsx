import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import CustomBreak from "../../components/CustomBreak";
import type { Video } from "../../utils/types";

interface AdminProps {
	movies: any;
	documentaries: any;
	tvshows: any;
}

function Admin({ movies, documentaries, tvshows }: AdminProps) {
	movies;
	documentaries;
	tvshows;
	document.title = "Hexagon TV Admin | Home";
	return (
		<div className="main">
			<GlobalNavBar />
			<CustomBreak height={3} />
			<h1 style={{ textAlign: "center" }}>Admin Page</h1>
			{movies
				.slice(0, 3)
				.reverse()
				.map((video: Video) => (
					<div className="adminPageCard">
						<img
							src={video.thumbnailURL}
							draggable="false"
							alt={video.name}
						/>
						<h2 style={{ marginLeft: "20px" }}>{video.name}</h2>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								marginBottom: "20px",
							}}
						>
							<button
								onClick={() =>
									(window.location.href = `/admin/edit/${video.urlName}`)
								}
								className="whiteButton"
							>
								Edit
							</button>
							<button
								onClick={() =>
									(window.location.href = `/admin/delete/${video.urlName}`)
								}
								className="redButton"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			<GlobalFooter />
		</div>
	);
}

export default Admin;
