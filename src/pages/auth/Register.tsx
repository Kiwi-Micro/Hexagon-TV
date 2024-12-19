import { useState } from "react";
import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { postJSONData } from "../../utils/api";
import PasswordBox from "../../components/PasswordBox";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [hasFailed, setHasFailed] =
		useState(false);
	const [failureReason, setFailureReason] =
		useState("");
	const [isVisible, setIsVisible] =
		useState(false);
	document.title = "Hexagon TV | Register";

	function handleLogin() {
		async function getId() {
			if (!username || !password || !email) {
				setHasFailed(true);
				setFailureReason(
					"Please fill in all fields!",
				);
				return;
			}
			try {
				const data = await postJSONData(
					`https://api.hexagon.kiwi-micro.com:8073/register`,
					{
						username: username,
						passwordCheckSum: password,
						email: email,
					},
				);
				if (data.status === "success") {
					window.location.href = "/login";
				} else {
					setFailureReason(data.status);
					setHasFailed(true);
				}
			} catch (error) {
				console.log(error);
				setFailureReason(
					"There was an error registering your account! Please try again later. (client error)",
				);
				setHasFailed(true);
			}
		}

		getId();
	}

	return (
		<div className="main">
			<GlobalNavBar />
			<div className="registerPage">
				<div className="registerPageDiv">
					<p className="registerPageHeader">
						Register
					</p>
					<div
						className="hasFailed"
						style={{
							display: hasFailed
								? "block"
								: "none",
						}}
					>
						{hasFailed && (
							<h4>{failureReason}</h4>
						)}
					</div>
					<div className="registerPageForm">
						<input
							type="email"
							placeholder="Email"
							className="registerPageFormInput"
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}
						/>
						<input
							type="text"
							placeholder="Username"
							className="registerPageFormInput"
							value={username}
							onChange={(e) =>
								setUsername(e.target.value)
							}
						/>
						<PasswordBox
							isVisible={isVisible}
							setIsVisible={setIsVisible}
							password={password}
							setPassword={setPassword}
						/>
						<button
							className="registerPageFormButton"
							onClick={() => handleLogin()}
						>
							Register
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default Register;
