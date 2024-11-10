import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getJSONData } from "../utils/api";
import VideoCard from "../components/VideoCard";
import logo from "../assets/img/logo.png";

interface SearchResult {
	category: string;
	date: string;
	description: string;
	id: string;
	name: string;
	rating: string;
	thumbnailURL: string;
	urlName: string;
	videoURL: string;
}

function GlobalNavBar() {
	const [query, setQuery] = useState("");
	const [shouldShowResults, setShouldShowResults] = useState(true);
	const [results, setResults] = useState<SearchResult[]>([]);
	const location = useLocation();
	const isSearchPage = location.pathname === "/search";

	useEffect(() => {
		handleSearch(query);
	}, [query]);

	async function handleSearch(searchQuery: string) {
		if (!query) return;
		const data = await getJSONData(`https://api.hexagon.kiwi-micro.com:8082/search?query=${searchQuery}`);
		setResults(data as SearchResult[]);
	}

	function handleSearchChange(e: any) {
		setShouldShowResults(true);
		setQuery(e.target.value);
	}

	function handleSearchClick() {
		if (query.length == 0) return;
		setShouldShowResults(true);
	}

	function handleClearSearch() {
		setTimeout(() => {
			setQuery("");
			setShouldShowResults(false);
			setResults([]);
		}, 1000);
	}

	function handleOnBlur() {
		setTimeout(() => {
			setShouldShowResults(false);
		}, 1000);
	}

	function handleKeyDown(e: any, override = false) {
		if (override) {
			window.location.href = `/search?query=${query}`;
		}
		if (e.key == "Enter") {
			window.location.href = `/search?query=${query}`;
		}
	}

	return (
		<nav>
			<ul>
				<li className="navLink">
					<a href="/">
						<img src={logo} alt="Logo" />
					</a>
				</li>
				{!isSearchPage && (
					<li className="navLink" style={{ position: "fixed", right: "10px" }}>
						<div className="searchBar" style={{ marginInline: "auto" }}>
							<svg height="24" viewBox="0 0 64 64" width="24" xmlns="http://www.w3.org/2000/svg" onClick={(e) => handleKeyDown(e, true)}>
								<path d="m26.72 50.414c5.205 0 10.005-1.683 13.932-4.488l14.773 14.773c.686.686 1.59 1.028 2.556 1.028 2.026 0 3.46-1.558 3.46-3.553 0-.935-.312-1.807-.998-2.493l-14.68-14.71c3.086-4.052 4.925-9.07 4.925-14.524 0-13.184-10.784-23.968-23.967-23.968-13.153 0-23.968 10.753-23.968 23.968 0 13.183 10.784 23.967 23.968 23.967zm0-5.174c-10.285 0-18.793-8.508-18.793-18.793 0-10.286 8.508-18.794 18.794-18.794 10.285 0 18.793 8.508 18.793 18.794 0 10.285-8.508 18.793-18.793 18.793z" />
							</svg>
							<input type="text" value={query} onChange={(e) => handleSearchChange(e)} onClick={() => handleSearchClick()} onBlur={() => handleOnBlur()} onKeyDown={(e) => handleKeyDown(e)} placeholder="Search" />
							<svg width="24" height="24" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" onClick={() => handleClearSearch()}>
								<path d="M7 14c3.83 0 7-3.177 7-7 0-3.83-3.177-7-7.007-7C3.171 0 0 3.17 0 7c0 3.823 3.177 7 7 7ZM4.694 9.882a.562.562 0 0 1-.563-.57c0-.15.055-.294.165-.397l1.901-1.908-1.9-1.901a.55.55 0 0 1-.166-.398c0-.323.247-.563.563-.563.158 0 .281.055.391.158L7 6.21l1.928-1.915a.52.52 0 0 1 .392-.165c.315 0 .57.247.57.563a.53.53 0 0 1-.172.405L7.81 7.007l1.9 1.9a.524.524 0 0 1 .172.406.57.57 0 0 1-.576.57.543.543 0 0 1-.405-.165L7 7.81 5.106 9.718a.57.57 0 0 1-.412.164Z" />
							</svg>
						</div>
						<div className="searchVideosList" style={results.length == 0 || shouldShowResults == false ? { display: "none" } : {}}>
							{results.slice(0, 3).map((video: SearchResult) => (
								<VideoCard key={video.urlName} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} isASearchResult={true} />
							))}
						</div>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default GlobalNavBar;
