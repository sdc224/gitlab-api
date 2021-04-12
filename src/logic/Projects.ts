import { caseConverter } from "../utils/objectHelper";
import { convertObjectToQuery } from "../utils/urlHelper";
import type { IConfig, IController, IControllerKey } from "../@types";
import type {
	GetUserProjectRequestObject,
	ProjectSchema,
	GetProjectRequestObject,
	IProjects,
	GetSingleProjectRequestObject,
	GetUserSingleProjectRequestObject,
	GetGroupSingleProjectRequestObject,
	GroupSchema,
	GetForkSingleProjectRequestObject
} from "../models";
import type { User } from "../models/User";

const Projects = (config: IConfig, controller: IController): IProjects => {
	const prepareProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;
		const endpointSchema = config.getEndpointSchema("projects");
		const params = `${endpointSchema.path}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: endpointSchema.method, params };
	};

	const prepareUserStarredProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const userId = requestObject.user_id;
		delete requestObject.user_id;

		const endpointSchema = config.getEndpointSchema("users");
		const params = `${endpointSchema.path}/${userId}/starred_projects${convertObjectToQuery(
			requestObject
		)}${optionalUrl}`;

		return { method: endpointSchema.method, params };
	};

	const prepareSingleProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0) optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		delete requestObject.id;

		const endpointSchema = config.getEndpointSchema("projects");
		const params = `${endpointSchema.path}/${id}${convertObjectToQuery(requestObject)}`;

		return { method: endpointSchema.method, params };
	};

	const prepareUsersInSingleProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		delete requestObject.id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const userEndpointSchemaPath = config.getEndpointSchema("users").path;

		const params = `${
			projectEndpointSchema.path
		}/${id}${userEndpointSchemaPath}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: projectEndpointSchema.method, params };
	};

	const prepareGroupsInSingleProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		delete requestObject.id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const groupEndpointSchemaPath = config.getEndpointSchema("groups").path;

		const params = `${
			projectEndpointSchema.path
		}/${id}${groupEndpointSchemaPath}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: projectEndpointSchema.method, params };
	};

	const prepareForksInSingleProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		delete requestObject.id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const forkEndpointSchemaPath = projectEndpointSchema.options?.otherPaths?.forks;

		if (!forkEndpointSchemaPath) throw new Error("Forks Path is missing!");

		const params = `${
			projectEndpointSchema.path
		}/${id}${forkEndpointSchemaPath}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: projectEndpointSchema.method, params };
	};

	const handleApiCall = async <T>(method: IControllerKey, params: string, data?: any) => {
		let res = null;

		console.log(params);
		// Call by object key value passing is not working for generic functions :C
		if (method === "get") res = await controller.get<ProjectSchema[]>(params);
		else if (method === "post") res = await controller.post<T>(params, data);
		else throw new Error("Incorrect Method Called");

		return res.data;
	};

	return {
		all: async (projectRequestObject?: GetProjectRequestObject) => {
			let requestObject = {};
			if (projectRequestObject) requestObject = caseConverter(projectRequestObject, "snake");

			const { method, params } = prepareProjectQueryURL(requestObject);

			const data = await handleApiCall<ProjectSchema[]>(method, params);

			return caseConverter(data, "camel") as ProjectSchema[];
		},
		user: async (userProjectRequestObject: GetUserProjectRequestObject) => {
			if (
				!userProjectRequestObject.userId ||
				typeof userProjectRequestObject.userId !== "string"
			)
				throw new Error("User ID must be there!");
			const requestObject = caseConverter(userProjectRequestObject, "snake");

			const { method, params } = prepareProjectQueryURL(requestObject);

			const data = await handleApiCall<ProjectSchema[]>(method, params);

			return caseConverter(data, "camel") as ProjectSchema[];
		},
		starredByUser: async (userProjectRequestObject: GetUserProjectRequestObject) => {
			if (
				!userProjectRequestObject.userId ||
				typeof userProjectRequestObject.userId !== "string"
			)
				throw new Error("User ID must be there!");
			const requestObject = caseConverter(userProjectRequestObject, "snake");

			const { method, params } = prepareUserStarredProjectQueryURL(requestObject);

			const data = await handleApiCall<ProjectSchema[]>(method, params);

			return caseConverter(data, "camel") as ProjectSchema[];
		},
		get: async (singleProjectRequestObject: GetSingleProjectRequestObject) => {
			if (!singleProjectRequestObject.id) throw new Error("Project ID must be there!");

			const requestObject = caseConverter(singleProjectRequestObject, "snake");
			const { method, params } = prepareSingleProjectQueryURL(requestObject);
			let data = await handleApiCall<ProjectSchema>(method, params);

			if (Array.isArray(data)) data = data[0];

			return caseConverter(data, "camel") as ProjectSchema;
		},
		getUsers: async (usersForSingleProjectRequestObject: GetUserSingleProjectRequestObject) => {
			if (!usersForSingleProjectRequestObject.id)
				throw new Error("Project ID must be there!");

			const requestObject = caseConverter(usersForSingleProjectRequestObject, "snake");
			const { method, params } = prepareUsersInSingleProjectQueryURL(requestObject);

			const data = await handleApiCall<User[]>(method, params);

			return caseConverter(data, "camel") as User[];
		},
		getGroups: async (
			groupsForSingleProjectRequestObject: GetGroupSingleProjectRequestObject
		) => {
			if (!groupsForSingleProjectRequestObject.id)
				throw new Error("Project ID must be there!");

			const requestObject = caseConverter(groupsForSingleProjectRequestObject, "snake");
			const { method, params } = prepareGroupsInSingleProjectQueryURL(requestObject);

			const data = await handleApiCall<GroupSchema[]>(method, params);

			return caseConverter(data, "camel") as GroupSchema[];
		},
		getForks: async (forksForSingleProjectRequestObject: GetForkSingleProjectRequestObject) => {
			if (!forksForSingleProjectRequestObject.id)
				throw new Error("Project ID must be there!");

			const requestObject = caseConverter(forksForSingleProjectRequestObject, "snake");
			const { method, params } = prepareForksInSingleProjectQueryURL(requestObject);

			const data = await handleApiCall<ProjectSchema[]>(method, params);

			return caseConverter(data, "camel") as ProjectSchema[];
		}
	};
};

export default Projects;
