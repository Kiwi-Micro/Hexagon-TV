import { useState, useEffect } from "react";
import { getJSONData } from "../utils/api";
import type { Video as Videos } from "../utils/types";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { AccountWatchlistTab, WatchlistDotIcon } from "./AccountMenuTabs";
import VideoCard from "../components/VideoCard";
import logo from "../assets/img/logo.png";

function GlobalNavBar() {
	const [query, setQuery] = useState("");
	const [shouldShowResults, setShouldShowResults] = useState(true);
	const [results, setResults] = useState<Videos[]>([]);
	const [isMobile, setIsMobile] = useState(false);
	const [isOnAdminPage, setIsOnAdminPage] = useState(false);
	const [shouldShowSearchBar, setShouldShowSearchBar] = useState(false);

	useEffect(() => {
		async function handleSearch(searchQuery: string) {
			if (!searchQuery) return;
			const data = await getJSONData(`/videoAPI/search?query=${searchQuery}`);
			setResults(data as Videos[]);
		}

		handleSearch(query);
	}, [query]);

	useEffect(() => {
		setIsOnAdminPage(window.location.href.includes("/admin"));
		setIsMobile(window.innerWidth < 740 ? true : false);
		setShouldShowSearchBar(window.location.href.includes("/search"));
	}, []);

	function handleSearchChange(e: any) {
		setShouldShowResults(true);
		setQuery(e.target.value);
	}

	function handleClearSearch(clearQuery: boolean) {
		setTimeout(() => {
			setShouldShowResults(false);
			if (clearQuery) {
				setQuery("");
				setResults([]);
			}
		}, 100);
	}

	function handleKeyDown(e: any, override: boolean = false) {
		if (e.key == "Enter" || override) {
			window.location.href = `/search?query=${query}`;
		}
	}

	return (
		<nav>
			<ul>
				<li>
					<a href={isOnAdminPage ? "/admin" : "/"}>
						<img src={logo} alt="Logo" height="40px" />
					</a>
				</li>
				<li
					style={{
						position: "fixed",
						right: "10px",
					}}
				>
					{!shouldShowSearchBar && (
						<>
							<div className="navSearchBar">
								{/* Search Button */}
								<svg
									height="24"
									viewBox="0 0 64 64"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
									onClick={
										isMobile
											? (e) => handleKeyDown(e, true)
											: () => (window.location.href = "/search")
									}
								>
									<path d="m26.72 50.414c5.205 0 10.005-1.683 13.932-4.488l14.773 14.773c.686.686 1.59 1.028 2.556 1.028 2.026 0 3.46-1.558 3.46-3.553 0-.935-.312-1.807-.998-2.493l-14.68-14.71c3.086-4.052 4.925-9.07 4.925-14.524 0-13.184-10.784-23.968-23.967-23.968-13.153 0-23.968 10.753-23.968 23.968 0 13.183 10.784 23.967 23.968 23.967zm0-5.174c-10.285 0-18.793-8.508-18.793-18.793 0-10.286 8.508-18.794 18.794-18.794 10.285 0 18.793 8.508 18.793 18.794 0 10.285-8.508 18.793-18.793 18.793z" />
								</svg>
								<input
									type="text"
									value={query}
									style={{ width: "80px" }}
									onChange={(e) => handleSearchChange(e)}
									onClick={
										query.length != 0 ? () => setShouldShowResults(true) : undefined
									}
									onKeyDown={(e) => handleKeyDown(e)}
									onBlur={() => handleClearSearch(false)}
									placeholder="Search"
								/>
								{/* Clear Search Button */}
								<svg
									width="24"
									height="24"
									viewBox="0 0 14 14"
									xmlns="http://www.w3.org/2000/svg"
									onClick={() => handleClearSearch(true)}
									style={isMobile ? { display: "none" } : {}}
								>
									<path d="M7 14c3.83 0 7-3.177 7-7 0-3.83-3.177-7-7.007-7C3.171 0 0 3.17 0 7c0 3.823 3.177 7 7 7ZM4.694 9.882a.562.562 0 0 1-.563-.57c0-.15.055-.294.165-.397l1.901-1.908-1.9-1.901a.55.55 0 0 1-.166-.398c0-.323.247-.563.563-.563.158 0 .281.055.391.158L7 6.21l1.928-1.915a.52.52 0 0 1 .392-.165c.315 0 .57.247.57.563a.53.53 0 0 1-.172.405L7.81 7.007l1.9 1.9a.524.524 0 0 1 .172.406.57.57 0 0 1-.576.57.543.543 0 0 1-.405-.165L7 7.81 5.106 9.718a.57.57 0 0 1-.412.164Z" />
								</svg>
							</div>
							<div
								className="navVideoList"
								style={
									results.length == 0 || shouldShowResults == false
										? { display: "none" }
										: {}
								}
							>
								{results.slice(0, 3).map((video: Videos) => (
									<VideoCard
										key={video.urlName}
										name={video.name}
										videoLink={`${video.urlName}`}
										thumbnailURL={video.thumbnailURL}
										isASearchResult={true}
									/>
								))}
							</div>
						</>
					)}
					{/* Account Button */}
					<div style={{ marginLeft: "10px" }}>
						<SignedOut>
							<SignInButton forceRedirectUrl="/" signUpForceRedirectUrl="/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 32 32"
									width="32"
									height="32"
									fill="currentColor"
									style={{ marginTop: "5px" }}
								>
									<path d="M14.007 28C6.299 28 0 21.703 0 14S6.299 0 14.007 0C21.7 0 28 6.297 28 14s-6.299 14-13.993 14zm0-9.392c4.253 0 7.49 1.514 8.805 3.216 1.815-2.08 2.899-4.81 2.899-7.824 0-6.54-5.12-11.784-11.704-11.784C7.41 2.216 2.289 7.46 2.289 14c0 3.014 1.084 5.743 2.9 7.824 1.313-1.702 4.55-3.216 8.818-3.216zm-.014-2.297c-2.6-.027-4.646-2.19-4.646-5.095-.014-2.73 2.059-4.986 4.646-4.986 2.601 0 4.647 2.256 4.647 4.986 0 2.906-2.032 5.122-4.647 5.095z"></path>
								</svg>
							</SignInButton>
						</SignedOut>
						<SignedIn>
							<UserButton>
								<UserButton.UserProfilePage
									label="Watchlist"
									url="custom"
									labelIcon={<WatchlistDotIcon />}
								>
									<AccountWatchlistTab />
								</UserButton.UserProfilePage>
							</UserButton>
						</SignedIn>
					</div>
				</li>
			</ul>
		</nav>
	);
}

export default GlobalNavBar;
