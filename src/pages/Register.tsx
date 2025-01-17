import GlobalNavBar from "../components/GlobalNavBar";
import { SignUp } from "@clerk/clerk-react";

function Register() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				height: "100vh",
				width: "100vw",
			}}
		>
			<GlobalNavBar />
			<SignUp />
		</div>
	);
}

export default Register;
