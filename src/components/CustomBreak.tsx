interface CustomBreakProps {
	height: number;
	hasHR?: boolean;
	paddBothSides?: boolean;
}

function CustomBreak({ height, hasHR = false, paddBothSides = false }: CustomBreakProps) {
	let tags = "";
	for (let i = 0; i < height; i++) {
		tags += "<br />";
	}
	if (hasHR) {
		tags += "<hr />";
	}
	if (paddBothSides) {
		for (let i = 0; i < height; i++) {
			tags += "<br />";
		}
	}
	return <span dangerouslySetInnerHTML={{ __html: tags }}></span>;
}

export default CustomBreak;
