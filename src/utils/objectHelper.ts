const toCamel = (str: string): string =>
	str.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace("-", "").replace("_", ""));

const toSnake = (str: string): string => str.replace(/[A-Z]/g, ($1) => `_${$1.toLowerCase()}`);

export const isObject = (obj: unknown): boolean =>
	obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function";

const keysToCamel = (obj: Record<string, any>): Record<string, any> => {
	if (isObject(obj)) {
		const n: Record<string, any> = {};

		Object.keys(obj).forEach((k) => {
			n[toCamel(k)] = keysToCamel(obj[k]);
		});

		return n;
	} else if (Array.isArray(obj)) {
		return obj.map((i) => {
			return keysToCamel(i);
		});
	}

	return obj;
};

const keysToSnake = (obj: Record<string, any>): Record<string, any> => {
	if (isObject(obj)) {
		const n: Record<string, any> = {};

		Object.keys(obj).forEach((k) => {
			n[toSnake(k)] = keysToSnake(obj[k]);
		});

		return n;
	} else if (Array.isArray(obj)) {
		return obj.map((i) => {
			return keysToSnake(i);
		});
	}

	return obj;
};

export const caseConverter = (
	obj: Record<string, any>,
	typeToConvert: "camel" | "snake"
): Record<string, any> => {
	switch (typeToConvert) {
		case "camel":
			return keysToCamel(obj);

		case "snake":
			return keysToSnake(obj);

		default:
			throw new Error("Please pass correct type to convert");
	}
};

export const snakeCaseToCamelCase = (input: string): string =>
	input
		.split("_")
		.reduce(
			(res, word, i) =>
				i === 0
					? word.toLowerCase()
					: `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`,
			""
		);

export const objectIsNullOrEmpty = (object: Record<string, unknown>): boolean => {
	if (!object) {
		return true;
	} else if (Object.keys(object).length === 0) {
		return true;
	}
	return false;
};
