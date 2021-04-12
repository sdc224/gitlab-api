import { caseConverter } from "../utils/objectHelper";
import { convertObjectToQuery } from "../utils/urlHelper";
import type { IConfig, IController } from "../@types";
import type { IMergeRequests, GetMergeRequestReqObject, MergeRequestSchema } from "../models";
import handleApiCall from "../utils/apiCaller";

const MergeRequests = (config: IConfig, controller: IController): IMergeRequests => {
	const prepareProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;
		const endpointSchema = config.getEndpointSchema("mergeRequests");
		const params = `${endpointSchema.path}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: endpointSchema.method, params };
	};

	return {
		all: async (mergeRequestReqObject: GetMergeRequestReqObject = {}) => {
			const requestObject = caseConverter(mergeRequestReqObject, "snake");

			const { method, params } = prepareProjectQueryURL(requestObject);
			const data = await handleApiCall<MergeRequestSchema[]>(controller, method, params);

			return caseConverter(data, "camel") as MergeRequestSchema[];
		}
	};
};

export default MergeRequests;
