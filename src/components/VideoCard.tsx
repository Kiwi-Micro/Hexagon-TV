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
	return (
		<div
			className={isASearchResult ? "navSearchCard" : "card"}
			onClick={() => (window.location.href = videoLink)}
		>
			<img src={thumbnailURL} draggable="false" alt={name} />
			{isASearchResult ? <h2>{name}</h2> : <h3>{name}</h3>}
		</div>
	);
}

export default videoCard;
