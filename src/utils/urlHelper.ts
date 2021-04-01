export const convertObjectToQuery = (
	objectToConvert: Record<string, string | number | boolean>
): string =>
	Object.keys(objectToConvert)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(objectToConvert[key])}`)
		.join("&");
