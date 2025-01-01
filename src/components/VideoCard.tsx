interface videoCardProps {
	name: string;
	videoLink: string;
	thumbnailURL: string;
	isASearchResult?: boolean;
}

function videoCard({
	name,
	videoLink,
	thumbnailURL,
	isASearchResult = false,
}: videoCardProps) {
	if (isASearchResult) {
		return (
			<div
				className="searchCard"
				onClick={() => (window.location.href = videoLink)}
			>
				<img src={thumbnailURL} draggable="false" alt={name} />
				<h2>{name}</h2>
			</div>
		);
	}
	return (
		<div
			className="card"
			onClick={() => (window.location.href = videoLink)}
		>
			<img src={thumbnailURL} draggable="false" alt={name} />
			<h3>{name}</h3>
		</div>
	);
}

export default videoCard;
