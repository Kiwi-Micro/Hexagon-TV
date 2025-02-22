/**
 *  Credit: Was made by ChatGPT but this is pritty colse:
 *  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 *  @param url - The URL to parse
 *  @param paramName - The name of the parameter to get the value of
 *  @returns The value of the parameter with the given name
 */
function getQueryString(url: string, paramName: string) {
	const urlObj = new URL(url);
	const queryParam = urlObj.searchParams.get(paramName);

	return queryParam;
}

export { getQueryString };
