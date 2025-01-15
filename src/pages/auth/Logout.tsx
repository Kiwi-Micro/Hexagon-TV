import { useEffect } from "react";
import { deleteJSONData } from "../../utils/api";

interface LogoutProps {
	all?: boolean;
}

function Logout({ all = false }: LogoutProps) {
	document.title = "Hexagon TV | Logout";

	const username = localStorage.getItem("username");
	const sessionId = localStorage.getItem("sessionId");

	if (username != null && sessionId != null) {
		localStorage.setItem("sessionId", "");
		localStorage.setItem("username", "");
	}

	useEffect(() => {
		async function logOut() {
			await deleteJSONData(
				`https://api.hexagon.kiwi-micro.com:8080/userAPI/logout`,
				{ username, sessionId, all },
			);
			setTimeout(() => {
				window.location.href = "/";
			}, 1000);
		}

		logOut();
	}, []);

	return (
		<div
			className="main"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100vw",
			}}
		>
			<h1>Logging Out...</h1>
		</div>
	);
}

export default Logout;
