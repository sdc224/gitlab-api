import type { IControllerKey, IController } from "../@types";

const handleApiCall = async <T>(
	controller: IController,
	method: IControllerKey,
	params: string,
	data?: any
): Promise<T> => {
	let res = null;

	console.log(params);
	// Call by object key value passing is not working for generic functions ☹
	if (method === "get") res = await controller.get<T>(params);
	else if (method === "post") res = await controller.post<T>(params, data);
	else if (method === "delete") res = await controller.delete<T>(params, data);
	else throw new Error("Incorrect Method Called");

	return res.data;
};

export default handleApiCall;
