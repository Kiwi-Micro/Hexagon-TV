import { useState, useEffect } from "react";
import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import { getJSONData } from "../utils/api";

interface LoginResponse {
	id: string;
	status: string;
}

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [id, setId] = useState<LoginResponse>({ id: "NONE", status: "fail" });
	document.title = "Hexagon TV | Login";

	function handleLogin() {
		async function getId() {
			if (!username || !password) return;
			const data = await getJSONData(`http://api.hexagon.kiwi-micro.com:8071/auth?username=${username}&passwordCheckSum=${password}`);
			setId({
				id: data.ID,
				status: data.Status,
			});
		}

		getId();
	}

	useEffect(() => {
		if (id.status === "success") {
			localStorage.setItem("id", id.id);
			localStorage.setItem("username", username);
			window.location.href = "/account";
		}
	}, [id]);

	return (
		<div className="main">
			<GlobalNavBar />
			<div className="loginPage">
				<div className="loginPageDiv">
					<p className="loginPageHeader">Login</p>
					<div className="loginPageForm">
						<input type="text" placeholder="Username" className="loginPageFormInput" value={username} onChange={(e) => setUsername(e.target.value)} />
						<input type="password" placeholder="Password" className="loginPageFormInput" value={password} onChange={(e) => setPassword(e.target.value)} />
						<button className="loginPageFormButton" onClick={() => handleLogin()}>
							Login
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Login;
