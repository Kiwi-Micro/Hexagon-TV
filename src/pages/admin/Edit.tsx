import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { Video } from "../../utils/types";
import CustomBreak from "../../components/CustomBreak";

interface EditProps {
	video: Video;
}

function Edit({ video }: EditProps) {
	document.title = "Hexagon TV Admin | Edit " + video.name;
	return (
		<div className="main">
			<GlobalNavBar />
			<CustomBreak height={3} />
			<div className="center">
				<h1>Edit page Comming Soon...</h1>
			</div>
			<CustomBreak height={1} />
			<GlobalFooter />
		</div>
	);
}

export default Edit;
