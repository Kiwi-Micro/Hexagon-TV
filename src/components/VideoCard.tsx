interface videoCardProps {
	name: string;
	videoLink: string;
	thumbnailURL: string;
}

function videoCard({ name, videoLink, thumbnailURL }: videoCardProps) {
	return (
		<div className="card" onClick={() => (window.location.href = videoLink)}>
			<img src={thumbnailURL} draggable="false" alt={name} />
			<div className="content">
				<h3>{name}</h3>
			</div>
		</div>
	);
}

export default videoCard;
