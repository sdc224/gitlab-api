import endpoints from "./defaultEndpoints";

const defaultConfig: IConfigObject = {
	host: "https://gitlab.example.com",
	baseURL: "",
	apiUrl: "api/",
	apiVersion: "v4",
	timeout: 10000,
	endpoints
};

export default defaultConfig;
