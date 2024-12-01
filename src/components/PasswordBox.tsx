interface PasswordBoxProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
}

function PasswordBox({ isVisible, setIsVisible, password, setPassword }: PasswordBoxProps) {
	return (
		<div className="loginPageFormPasswordDiv">
			<input type={isVisible ? "text" : "password"} placeholder="Password" className="loginPageFormInput" value={password} onChange={(e) => setPassword(e.target.value)} />
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => setIsVisible(!isVisible)} style={{ marginTop: "5px" }}>
				<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
				<circle cx="12" cy="12" r="3" />
				{isVisible ? <line x1="1" y1="1" x2="23" y2="23" /> : ""}
			</svg>
		</div>
	);
}

export default PasswordBox;
