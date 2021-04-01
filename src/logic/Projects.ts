import { caseConverter } from "../utils/objectHelper";
import { convertObjectToQuery } from "../utils/urlHelper";

jest.setTimeout(30000);

const Projects = (config: IConfig, controller: IController): IProjects => {
	const prepareProjectQueryURL = (requestObject: any) => {
		const endpointSchema = config.getEndpointSchema("projects");
		const params = `${endpointSchema.path}?${convertObjectToQuery(requestObject)}`;

		return { endpointSchema, params };
	};

	const handleApiCall = async (endpointSchema: IEndpointSchema, params: string, data?: any) => {
		let res = null;

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
		}
	};
};

jest.setTimeout(5000);

export default Projects;
