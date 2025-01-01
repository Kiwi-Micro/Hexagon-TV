import { useState } from "react";
import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { callAPI } from "../../utils/api";
import PasswordBox from "../../components/PasswordBox";

interface PasswordEntryProps {
	operationName: string;
	operationURL: string;
	operationFailMessage: string;
	operationAPIType: string;
	isDangerous?: boolean;
	isLogin?: boolean;
}

function PasswordEntry({
	operationName,
	operationURL,
	operationFailMessage,
	isDangerous = false,
	operationAPIType,
	isLogin = false,
}: PasswordEntryProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [hasFailed, setHasFailed] = useState(false);
	const [failureReason, setFailureReason] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	document.title = "Hexagon TV | " + operationName;

	function handleDeleteAccount() {
		async function getId() {
			if (!username || !password) {
				setHasFailed(true);
				setFailureReason("Please fill in all fields!");
				return;
			}

			const loggedInUsername = localStorage.getItem("username");

			if (username != loggedInUsername && isDangerous) {
				setHasFailed(true);
				setFailureReason(
					"Please Enter The Username That You Are Loged In With!",
				);
				return;
			}

			try {
				const data = await callAPI(
					operationURL,
					{
						username: username,
						passwordCheckSum: password,
					},
					operationAPIType,
				);
				if (data.status === "success") {
					if (isLogin) {
						localStorage.setItem("sessionId", data.sessionId);
						localStorage.setItem("username", username);
					} else {
						localStorage.setItem("sessionId", "");
						localStorage.setItem("username", "");
					}
					window.location.href = "/";
				} else {
					setFailureReason(data.status);
					setHasFailed(true);
				}
			} catch (error) {
				console.log(error);
				setFailureReason(operationFailMessage);
				setHasFailed(true);
			}
		}

		getId();
	}

	return (
		<div className="main">
			<GlobalNavBar />
			<div className={isDangerous ? "warningPage" : "loginPage"}>
				<div className={isDangerous ? "warningPageDiv" : "loginPageDiv"}>
					<p
						className={
							isDangerous ? "warningPageHeader" : "loginPageHeader"
						}
					>
						{operationName}
					</p>
					<div
						className="failMessage"
						style={{
							display: hasFailed ? "block" : "none",
						}}
					>
						{hasFailed && <h4>{failureReason}</h4>}
					</div>
					<div
						className={isDangerous ? "warningPageForm" : "loginPageForm"}
					>
						<input
							type="text"
							placeholder="Username"
							className={
								isDangerous ? "warningPageFormInput" : "loginPageFormInput"
							}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<PasswordBox
							isVisible={isVisible}
							setIsVisible={setIsVisible}
							password={password}
							setPassword={setPassword}
						/>
						<button
							className={
								isDangerous
									? "warningPageFormButton"
									: "loginPageFormButton"
							}
							onClick={() => handleDeleteAccount()}
						>
							{operationName}
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default PasswordEntry;
