import { useEffect } from "react";
import { postJSONData } from "../../utils/api";

function Logout() {
	document.title = "Hexagon TV | Logout";

	const username = localStorage.getItem("username");
	const id = localStorage.getItem("id");

	if (username != null && id != null) {
		localStorage.setItem("id", "");
		localStorage.setItem("username", "");
	}

	useEffect(() => {
		async function logOut() {
			await postJSONData(`https://api.hexagon.kiwi-micro.com:8073/logout`, {
				username: username,
				id: id,
			});
			setTimeout(() => {
				window.location.href = "/";
			}, 1000);
		}

		logOut();
	}, []);

	return (
		<div className="main" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
			<h1>Logging Out...</h1>
		</div>
	);
}

export default Logout;
