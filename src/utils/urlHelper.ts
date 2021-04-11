export const convertObjectToQuery = (
	objectToConvert: Record<string, string | number | boolean>
): string => {
	const queryURL = Object.keys(objectToConvert)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(objectToConvert[key])}`)
		.join("&");

	if (queryURL.length > 0) return "?" + queryURL;
	return "";
};
