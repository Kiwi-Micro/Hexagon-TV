import VideoCard from "./VideoCard";

interface VideoCarouselProps {
	db: any;
	title: string;
}

function renderVideoCard(db: any) {
	return db
		.slice()
		.reverse()
		.map((video: any) => {
			return (
				<VideoCard
					key={video.urlName}
					name={video.name}
					videoLink={`${video.urlName}.html`}
					thumbnailURL={video.thumbnailURL}
				/>
			);
		});
}

function VideoCarousel({ db, title }: VideoCarouselProps) {
	return (
		<div>
			{db.length > 0 && db[0].id !== "0" ? (
				<>
					<h1 className="homePageVideosHeader">{title}</h1>
					<div className="homePageVideosList">{renderVideoCard(db)}</div>
				</>
			) : null}
		</div>
	);
}

export default VideoCarousel;
