import GlobalNavBar from "../components/GlobalNavBar";
import GlobalFooter from "../components/GlobalFooter";
import logo from "../assets/img/logo.png";
import "../assets/main.css";

function NotFound() {
	document.title = "Hexagon TV | 404";
	return (
		<div className="main">
			<GlobalNavBar />
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", height: "100vh", width: "100vw" }}>
				<img src={logo} width="200px" height="200px" alt="Logo" />
				<h1 style={{ fontSize: "4rem", margin: "0", textAlign: "center", color: "#ffffff" }}>404</h1>
				<h3 style={{ textAlign: "center" }}>Page Not Found</h3>
			</div>
			<GlobalFooter />
		</div>
	);
}

export default NotFound;
