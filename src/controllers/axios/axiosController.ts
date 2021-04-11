import axios, { AxiosInstance } from "axios";
import setupInterceptors from "./interceptors";
import type { IConfig, IAuthentication, IController } from "../../@types";

const AxiosController = (
	config: IConfig,
	authentication: IAuthentication
): AxiosInstance & IController => {
	const customAxios = axios.create({
		baseURL: config.getBaseURL(),
		timeout: config.getTimeout(),
		headers: authentication.getHeader()
	});
	setupInterceptors(customAxios);
	return customAxios;
};

export default AxiosController;
