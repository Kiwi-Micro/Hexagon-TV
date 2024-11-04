import logo from "../assets/img/logo.png";

function GlobalNavBar() {
	return (
		<nav>
			<ul>
				<a href="/" className="navLink">
					<img src={logo} alt="Logo" />
				</a>
			</ul>
		</nav>
	);
}

export default GlobalNavBar;
