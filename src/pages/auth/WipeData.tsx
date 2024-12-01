import { useState } from "react";
import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { deleteJSONData } from "../../utils/api";
import PasswordBox from "../../components/PasswordBox";

function WipeData() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [hasFailed, setHasFailed] = useState(false);
	const [failureReason, setFailureReason] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	document.title = "Hexagon TV | Wipe Data";

	function handleWipeData() {
		async function getId() {
			if (!username || !password) {
				setHasFailed(true);
				setFailureReason("Please fill in all fields!");
				return;
			}
			try {
				const data = await deleteJSONData(`https://api.hexagon.kiwi-micro.com:8073/wipe`, {
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
				setFailureReason("There was an error wiping your data! Please try again later. (500)");
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
					<p className="warningPageHeader">Wipe Data</p>
					<div className="hasFailed" style={{ display: hasFailed ? "block" : "none" }}>
						{hasFailed && <h4>{failureReason}</h4>}
					</div>
					<div className="warningPageForm">
						<input type="text" placeholder="Username" className="warningPageFormInput" value={username} onChange={(e) => setUsername(e.target.value)} />
						<PasswordBox isVisible={isVisible} setIsVisible={setIsVisible} password={password} setPassword={setPassword} />
						<button className="warningPageFormButton" onClick={() => handleWipeData()}>
							Wipe Data
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default WipeData;
