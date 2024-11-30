import { useState } from "react";
import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import { patchJSONData } from "../utils/api";

function ChangePassword() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPssword, setNewPassword] = useState("");
	const [hasFailed, setHasFailed] = useState(false);
	const [failureReason, setFailureReason] = useState("");
	document.title = "Hexagon TV | Change Password";

	function handleWipeData() {
		async function getId() {
			if (!oldPassword || !newPssword) {
				setHasFailed(true);
				setFailureReason("Please fill in all fields!");
				return;
			}
			try {
				const username = localStorage.getItem("username");
				const data = await patchJSONData(`https://api.hexagon.kiwi-micro.com:8073/changePassword`, {
					username: username,
					newPassword: newPssword,
					oldPassword: oldPassword,
				});
				if (data.status === "success") {
					localStorage.setItem("id", "");
					localStorage.setItem("username", "");
					window.location.href = "/login";
				} else {
					setFailureReason(data.status);
					setHasFailed(true);
				}
			} catch (error) {
				setFailureReason("There was an error changing your password (it has not been changed)! Please try again later. (client error)");
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
					<p className="warningPageHeader">Change Password</p>
					<div className="hasFailed" style={{ display: hasFailed ? "block" : "none" }}>
						{hasFailed && <h4>{failureReason}</h4>}
					</div>
					<div className="warningPageForm">
						<input type="password" placeholder="Old Password" className="warningPageFormInput" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
						<input type="password" placeholder="New Password" className="warningPageFormInput" value={newPssword} onChange={(e) => setNewPassword(e.target.value)} />
						<button className="warningPageFormButton" onClick={() => handleWipeData()}>
							Change Password
						</button>
					</div>
				</div>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default ChangePassword;
