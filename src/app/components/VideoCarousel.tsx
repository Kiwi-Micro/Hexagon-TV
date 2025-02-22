import { renderVideoCard } from "../utils/renders";

interface VideoCarouselProps {
	db: any;
	title: string;
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
