import type { IControllerKey } from "./controller";

export type EndpointMain = {
	path: string;
	method: IControllerKey;
};

export type IEndpointSchema = EndpointMain & {
	options?: {
		postOnCreation?: boolean;
		otherEndpoints?: { [index: string]: EndpointMain };
	};
};

export type IEndpoints = {
	projects: IEndpointSchema;
	users: IEndpointSchema;
	groups: IEndpointSchema;
};

export type IEndpointKey = keyof IEndpoints;

export type IConfigObject = {
	host: string;
	baseURL: string;
	apiUrl: string;
	apiVersion: string;
	timeout: number;
	endpoints: IEndpoints;
};

export type IConfig = {
	readonly getHost: () => string;
	readonly getBaseURL: () => string;
	readonly getAPIVersion: () => string;
	readonly getTimeout: () => number;
	readonly getEndpoints: () => IEndpoints;
	readonly getEndpointSchema: (_: IEndpointKey) => IEndpointSchema;
	readonly getConfig: () => IConfigObject;
	readonly setHost: (_: string) => void;
	readonly setAPIVersion: (_: string) => void;
	readonly setTimeout: (_: number) => void;
	readonly setEndpoints: (_: IEndpoints) => void;
};
