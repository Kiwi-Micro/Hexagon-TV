interface CustomBreakProps {
	height: number;
	hasHR?: boolean;
	paddBothSides?: boolean;
}

function CustomBreak({ height, hasHR = false, paddBothSides = false }: CustomBreakProps) {
	let br = "";
	for (let i = 0; i < height; i++) {
		br += "<br />";
	}
	if (hasHR) {
		br += "<hr />";
	}
	if (paddBothSides) {
		for (let i = 0; i < height; i++) {
			br += "<br />";
		}
	}
	return <span dangerouslySetInnerHTML={{ __html: br }}></span>;
}

export default CustomBreak;
