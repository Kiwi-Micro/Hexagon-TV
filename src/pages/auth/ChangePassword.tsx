import { useState } from "react";
import GlobalNavBar from "../../components/GlobalNavBar";
import GlobalFooter from "../../components/GlobalFooter";
import { patchJSONData } from "../../utils/api";
import PasswordBox from "../../components/PasswordBox";

function ChangePassword() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [hasFailed, setHasFailed] = useState(false);
	const [failureReason, setFailureReason] = useState("");
	const [oldIsVisible, setOldIsVisible] = useState(false);
	const [newIsVisible, setNewIsVisible] = useState(false);
	document.title = "Hexagon TV | Change Password";

	function handleWipeData() {
		async function getId() {
			if (!oldPassword || !newPassword) {
				setHasFailed(true);
				setFailureReason("Please fill in all fields!");
				return;
			}
			try {
				const username = localStorage.getItem("username");
				const data = await patchJSONData(
					`https://api.hexagon.kiwi-micro.com:8081/changePassword`,
					{
						username: username,
						newPassword: newPassword,
						oldPassword: oldPassword,
					},
				);
				if (data.status === "success") {
					localStorage.setItem("sessionId", "");
					localStorage.setItem("username", "");
					window.location.href = "/login";
				} else {
					setFailureReason(data.status);
					setHasFailed(true);
				}
			} catch (error) {
				console.log(error);
				setFailureReason(
					"There was an error changing your password (it has not been changed)! Please try again later. (client error)",
				);
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
					<div
						className="failMessage"
						style={{
							display: hasFailed ? "block" : "none",
						}}
					>
						{hasFailed && <h4>{failureReason}</h4>}
					</div>
					<div className="warningPageForm">
						<PasswordBox
							isVisible={oldIsVisible}
							setIsVisible={setOldIsVisible}
							password={oldPassword}
							setPassword={setOldPassword}
							placeholder="Old Password"
						/>
						<PasswordBox
							isVisible={newIsVisible}
							setIsVisible={setNewIsVisible}
							password={newPassword}
							setPassword={setNewPassword}
							placeholder="New Password"
						/>
						<button
							className="warningPageFormButton"
							onClick={() => handleWipeData()}
						>
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
