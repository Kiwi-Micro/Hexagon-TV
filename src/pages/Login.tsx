import GlobalNavBar from "../components/GlobalNavBar";
import { SignIn } from "@clerk/clerk-react";

function Login() {
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
			<SignIn />
		</div>
	);
}

export default Login;
