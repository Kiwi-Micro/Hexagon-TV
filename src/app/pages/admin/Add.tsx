import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import CustomBreak from "../../components/CustomBreak";
import { UploadButton } from "../../utils/uploadthing";

interface AddProps {}

function Add({}: AddProps) {
	document.title = "Hexagon TV Add | Add Video";
	return (
		<div className="main">
			<GlobalNavBar />
			<CustomBreak height={3} />
			<p>Add Page</p>
			<UploadButton
				endpoint="videoAndImage"
				onUploadError={(error) => {
					console.error("ERROR:", error, error.cause);
				}}
				headers={{
					sessionId: localStorage.getItem("sessionId") || "",
					userId: localStorage.getItem("userId") || "",
				}}
			/>
			<GlobalFooter />
		</div>
	);
}

export default Add;
