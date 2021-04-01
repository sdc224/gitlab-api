const Config = (
	host: string,
	apiVersion: string,
	timeout: number,
	apiUrl: string,
	endpoints: IEndpoints
): IConfig => {
	if (host[host.length - 1] !== "/") host += "/";
	if (apiUrl[apiUrl.length - 1] !== "/") apiUrl += "/";

	const baseURL = host + apiUrl + apiVersion;
	const configObj: IConfigObject = {
		host,
		baseURL,
		apiUrl,
		apiVersion,
		timeout,
		endpoints
	};

	return {
		getHost: () => configObj.host,
		getBaseURL: () => configObj.baseURL,
		getAPIVersion: () => configObj.apiVersion,
		getTimeout: () => configObj.timeout,
		getEndpoints: () => configObj.endpoints,
		getEndpointSchema: (name: IEndpointKey) => configObj.endpoints[name],
		getConfig: () => configObj,
		setHost: (host: string) => (configObj.host = host),
		setAPIVersion: (apiVersion: string) => (configObj.apiVersion = apiVersion),
		setTimeout: (timeout: number) => (configObj.timeout = timeout),
		setEndpoints: (endpoints: IEndpoints) => (configObj.endpoints = endpoints)
	};
};

export default Config;
