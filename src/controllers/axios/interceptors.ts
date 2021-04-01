import type { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => config;

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

export default function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
	axiosInstance.interceptors.request.use(onRequest, onRequestError);
	axiosInstance.interceptors.response.use(onResponse, onResponseError);
	return axiosInstance;
}
