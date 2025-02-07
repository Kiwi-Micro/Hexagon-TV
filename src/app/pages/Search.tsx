import { useState, useEffect } from "react";
import { getJSONData } from "../utils/api";
import type { Video } from "../utils/types";
import VideoCard from "../components/VideoCard";
import GlobalNavBar from "../components/GlobalNavBar";
import CustomBreak from "../components/CustomBreak";

function Search() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Video[]>([]);
	const urlParams = new URLSearchParams(window.location.search);
	const queryParam = urlParams.get("query");

	async function handleSearch(query: string) {
		if (!query) return;
		const data = await getJSONData(`/API/videoAPI/search?query=${query}`);
		setResults(data as Video[]);
	}

	useEffect(() => {
		if (queryParam) {
			setQuery(queryParam);
			handleSearch(queryParam);
		}
	}, []);

	useEffect(() => {
		handleSearch(query);
	}, [query]);

	return (
		<div>
			<GlobalNavBar />
			<CustomBreak height={3} />
			<div className="searchBar" style={{ marginInline: "auto" }}>
				<svg
					height="24"
					viewBox="0 0 64 64"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="m26.72 50.414c5.205 0 10.005-1.683 13.932-4.488l14.773 14.773c.686.686 1.59 1.028 2.556 1.028 2.026 0 3.46-1.558 3.46-3.553 0-.935-.312-1.807-.998-2.493l-14.68-14.71c3.086-4.052 4.925-9.07 4.925-14.524 0-13.184-10.784-23.968-23.967-23.968-13.153 0-23.968 10.753-23.968 23.968 0 13.183 10.784 23.967 23.968 23.967zm0-5.174c-10.285 0-18.793-8.508-18.793-18.793 0-10.286 8.508-18.794 18.794-18.794 10.285 0 18.793 8.508 18.793 18.794 0 10.285-8.508 18.793-18.793 18.793z"></path>
				</svg>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search"
				/>
			</div>
			<div>
				<div className="searchPageVideosList">
					{results.map((video: Video) => (
						<VideoCard
							key={video.urlName}
							name={video.name}
							videoLink={`${video.urlName}.html`}
							thumbnailURL={video.thumbnailURL}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Search;
