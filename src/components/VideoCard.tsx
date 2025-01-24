interface videoCardProps {
	id: number;
	name: string;
	videoLink: string;
	thumbnailURL: string;
	isASearchResult?: boolean;
}

function videoCard({
	id,
	name,
	videoLink,
	thumbnailURL,
	isASearchResult = false,
}: videoCardProps) {
	return (
		<div
			className={isASearchResult ? "navSearchCard" : "card"}
			style={isASearchResult && id == 1 ? { marginTop: "0px" } : {}}
			onClick={() => (window.location.href = videoLink)}
		>
			<img src={thumbnailURL} draggable="false" alt={name} />
			{isASearchResult ? <h2>{name}</h2> : <h3>{name}</h3>}
		</div>
	);
}

export default videoCard;
