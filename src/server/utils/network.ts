/*
 *  Credit: Was made by ChatGPT but this is pritty colse:
 *  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
function getQueryString(url: string, paramName: string) {
	const urlObj = new URL(url);
	const queryParam = urlObj.searchParams.get(paramName);

	return queryParam;
}

export { getQueryString };
