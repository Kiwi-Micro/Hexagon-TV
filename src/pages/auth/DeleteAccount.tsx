import { useState } from "react";
import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { deleteJSONData } from "../../utils/api";
import PasswordBox from "../../components/PasswordBox";

function DeleteAccount() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [hasFailed, setHasFailed] = useState(false);
	const [failureReason, setFailureReason] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	document.title = "Hexagon TV | Delete Account";

	function handleDeleteAccount() {
		async function getId() {
			if (!username || !password) {
				setHasFailed(true);
				setFailureReason("Please fill in all fields!");
				return;
			}
			try {
				const data = await deleteJSONData(`https://api.hexagon.kiwi-micro.com:8073/delete`, {
					username: username,
					passwordCheckSum: password,
				});
				if (data.status === "success") {
					localStorage.setItem("id", "");
					localStorage.setItem("username", "");
					window.location.href = "/";
				} else {
					setFailureReason(data.status);
					setHasFailed(true);
				}
			} catch (error) {
				setFailureReason("There was an error deleting your account! Please try again later. (500)");
				setHasFailed(true);
			}
		}

		getId();
	}

	return (
		<div className="main">
			<GlobalNavBar />
			<div className="warningPage">
				<div className="warningPageDiv">
					<p className="warningPageHeader">Delete Account</p>
					<div className="hasFailed" style={{ display: hasFailed ? "block" : "none" }}>
						{hasFailed && <h4>{failureReason}</h4>}
					</div>
					<div className="warningPageForm">
						<input type="text" placeholder="Username" className="warningPageFormInput" value={username} onChange={(e) => setUsername(e.target.value)} />
						<PasswordBox isVisible={isVisible} setIsVisible={setIsVisible} password={password} setPassword={setPassword} />
						<button className="warningPageFormButton" onClick={() => handleDeleteAccount()}>
							Delete Account
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default DeleteAccount;
