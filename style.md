# Contributing to Hexagon TV

If you wish to contribute, please make sure you follow the guidelines set below. There is a high chance we will not accept a pull request if it does not follow our guidelines.

- Our IDE of choice for this project is VS Code. If you use another IDE, do not include any of the project settings with your commits, unless they are urgent!

- If you are fixing a bug please make sure there is an issue open in the correct project regarding the bug you are working on.

- All indents are TAB characters, not spaces.

- Braces start on the same line end on a new-line (See Code Example A).

- A function/if-else block containing only one statement should be surrounded by braces, unless it is a if-else block ONLY returning to escape a function (See Code Example B).

- Ternary statements should be used only where suiting (See Code Example C).

- Make sure any changes you submit are tested properly!

## Code Example A:

```ts
function renderVideoCard(db: any) {
	return db
		.slice()
		.reverse()
		.map((video: any) => {
			return <VideoCard key={video.id} name={video.name} videoLink={`${video.urlName}.html`} thumbnailURL={video.thumbnailURL} />;
		});
}
```

## Code Example B:

```ts
async function handleSearch(searchQuery: string) {
	if (!query) return;
	const data = await getJSONData(`https://api.hexagon.kiwi-micro.com:8082/search?query=${searchQuery}`);
	setResults(data as SearchResult[]);
}
```

## Code Example C:

```ts
function displayRating(ratingInfo) {
	return (
		<div>
			<p>ratingInfo ? ratingInfo.description : "Rating not found"</p>
		</div>
	);
}
```
