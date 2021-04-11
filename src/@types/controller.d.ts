export type Response<T> = {
	data: T;
	status: number;
};

export type IController = {
	get<T = any, R = Response<T>>(url: string): Promise<R>;
	post<T = any, R = Response<T>>(url: string, data?: any): Promise<R>;
};

export type IControllerKey = keyof IController;
