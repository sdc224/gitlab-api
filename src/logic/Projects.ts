import { caseConverter } from "../utils/objectHelper";
import { convertObjectToQuery } from "../utils/urlHelper";
import type { IConfig, IController, IEndpointSchema } from "../@types";
import type {
	GetUserProjectRequestObject,
	IProjectSchema,
	GetProjectRequestObject,
	IProjects
} from "../models";

const Projects = (config: IConfig, controller: IController): IProjects => {
	const prepareProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0) optionalUrl = `/${optionalUrl}`;
		const endpointSchema = config.getEndpointSchema("projects");
		const params = `${endpointSchema.path}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { endpointSchema, params };
	};

	const prepareUserStarredProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0) optionalUrl = `/${optionalUrl}`;
		const userId = requestObject.user_id;

		delete requestObject.user_id;

		const endpointSchema = config.getEndpointSchema("users");
		const params = `${endpointSchema.path}/${userId}/starred_projects${convertObjectToQuery(
			requestObject
		)}`;

		return { endpointSchema, params };
	};

	const handleApiCall = async (endpointSchema: IEndpointSchema, params: string, data?: any) => {
		let res = null;

		console.log(params);
		// Call by object key value passing is not working for generic functions :C
		if (endpointSchema.method === "get") res = await controller.get<IProjectSchema[]>(params);
		else if (endpointSchema.method === "post")
			res = await controller.post<IProjectSchema[]>(params, data);
		else throw new Error("Incorrect Method Called");

		return res.data;
	};

	return {
		all: async (projectRequestObject?: GetProjectRequestObject) => {
			let requestObject = {};
			if (projectRequestObject) requestObject = caseConverter(projectRequestObject, "snake");

			const { endpointSchema, params } = prepareProjectQueryURL(requestObject);

			const data = await handleApiCall(endpointSchema, params);

			return caseConverter(data, "camel") as IProjectSchema[];
		},
		user: async (userProjectRequestObject: GetUserProjectRequestObject) => {
			if (
				!userProjectRequestObject.userId ||
				typeof userProjectRequestObject.userId !== "string"
			)
				throw new Error("User ID must be there!");
			const requestObject = caseConverter(userProjectRequestObject, "snake");

			const { endpointSchema, params } = prepareProjectQueryURL(requestObject);

			const data = await handleApiCall(endpointSchema, params);

			return caseConverter(data, "camel") as IProjectSchema[];
		},
		starredByUser: async (userProjectRequestObject: GetUserProjectRequestObject) => {
			if (
				!userProjectRequestObject.userId ||
				typeof userProjectRequestObject.userId !== "string"
			)
				throw new Error("User ID must be there!");
			const requestObject = caseConverter(userProjectRequestObject, "snake");

			const { endpointSchema, params } = prepareUserStarredProjectQueryURL(requestObject);

			const data = await handleApiCall(endpointSchema, params);

			return caseConverter(data, "camel") as IProjectSchema[];
		}
	};
};

export default Projects;
