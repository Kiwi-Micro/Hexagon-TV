import logo from "../assets/img/logo.png";

function GlobalNavBar() {
	return (
		<nav>
			<ul>
				<li className="navLink">
					<a href="/">
						<img src={logo} alt="Logo" />
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default GlobalNavBar;
