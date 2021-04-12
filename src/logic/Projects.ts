import { caseConverter } from "../utils/objectHelper";
import { convertObjectToQuery } from "../utils/urlHelper";
import type { IConfig, IController } from "../@types";
import type {
	GetUserProjectRequestObject,
	ProjectSchema,
	GetProjectRequestObject,
	IProjects,
	GetSingleProjectRequestObject,
	GetUserSingleProjectRequestObject,
	GetGroupSingleProjectRequestObject,
	GroupSchema,
	GetForkSingleProjectRequestObject,
	PostForkProjectRequestObject,
	GetLabelSingleProjectRequestObject,
	GetSingleLabelSingleProjectRequestObject
} from "../models";
import type { User } from "../models/User";
import type { LabelSchema, Label, SingleLabelSingleProjectRequestObject } from "../models/Label";
import handleApiCall from "../utils/apiCaller";

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
		const forksEndpointSchemaPath = projectEndpointSchema.options?.otherEndpoints?.forks;

		if (!forksEndpointSchemaPath) throw new Error("Forks Path is missing!");

		const params = `${projectEndpointSchema.path}/${id}${
			forksEndpointSchemaPath.path
		}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: forksEndpointSchemaPath.method, params };
	};

	const prepareForkProjectPostURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		delete requestObject.id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const forkEndpointSchemaPath = projectEndpointSchema.options?.otherEndpoints?.fork;

		if (!forkEndpointSchemaPath) throw new Error("Fork Path is missing!");

		const params = `${projectEndpointSchema.path}/${id}${forkEndpointSchemaPath.path}${optionalUrl}`;

		return { method: forkEndpointSchemaPath.method, params, formData: requestObject };
	};

	const prepareLabelInSingleProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		const labelId = requestObject.label_id;
		delete requestObject.id;
		delete requestObject.label_id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const labelsEndpointSchemaPath = projectEndpointSchema.options?.otherEndpoints?.labels;

		if (!labelsEndpointSchemaPath) throw new Error("Labels Path is missing!");

		const params = `${projectEndpointSchema.path}/${id}${
			labelsEndpointSchemaPath.path
		}/${labelId}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: labelsEndpointSchemaPath.method, params };
	};
	const prepareLabelsInSingleProjectQueryURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		delete requestObject.id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const labelsEndpointSchemaPath = projectEndpointSchema.options?.otherEndpoints?.labels;

		if (!labelsEndpointSchemaPath) throw new Error("Labels Path is missing!");

		const params = `${projectEndpointSchema.path}/${id}${
			labelsEndpointSchemaPath.path
		}${convertObjectToQuery(requestObject)}${optionalUrl}`;

		return { method: labelsEndpointSchemaPath.method, params };
	};

	const prepareLabelProjectPostURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		delete requestObject.id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const labelsEndpointSchemaPath = projectEndpointSchema.options?.otherEndpoints?.labels;
		const postOnCreation = projectEndpointSchema.options?.postOnCreation;

		if (!labelsEndpointSchemaPath) throw new Error("Labels Path is missing!");

		const params = `${projectEndpointSchema.path}/${id}${labelsEndpointSchemaPath.path}${optionalUrl}`;

		return {
			method: postOnCreation ? "post" : labelsEndpointSchemaPath.method,
			params,
			formData: requestObject
		};
	};

	const prepareLabelProjectDeleteURL = (requestObject: any, optionalUrl = "") => {
		if (optionalUrl.length > 0 && optionalUrl[0] !== "/") optionalUrl = `/${optionalUrl}`;

		const id = requestObject.id;
		const labelId = requestObject.label_id;
		delete requestObject.id;
		delete requestObject.label_id;

		const projectEndpointSchema = config.getEndpointSchema("projects");
		const labelsEndpointSchemaPath = projectEndpointSchema.options?.otherEndpoints?.labels;
		const deleteOnDeletion = projectEndpointSchema.options?.deleteOnDeletion;

		if (!labelsEndpointSchemaPath) throw new Error("Labels Path is missing!");

		const params = `${projectEndpointSchema.path}/${id}${labelsEndpointSchemaPath.path}/${labelId}${optionalUrl}`;

		return {
			method: deleteOnDeletion ? "delete" : labelsEndpointSchemaPath.method,
			params,
			formData: requestObject
		};
	};

	return {
		all: async (projectRequestObject: GetProjectRequestObject = {}) => {
			const requestObject = caseConverter(projectRequestObject, "snake");

			const { method, params } = prepareProjectQueryURL(requestObject);
			const data = await handleApiCall<ProjectSchema[]>(controller, method, params);

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

			const data = await handleApiCall<ProjectSchema[]>(controller, method, params);

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

			const data = await handleApiCall<ProjectSchema[]>(controller, method, params);

			return caseConverter(data, "camel") as ProjectSchema[];
		},
		get: async (singleProjectRequestObject: GetSingleProjectRequestObject) => {
			if (!singleProjectRequestObject.id) throw new Error("Project ID must be there!");

			const requestObject = caseConverter(singleProjectRequestObject, "snake");
			const { method, params } = prepareSingleProjectQueryURL(requestObject);
			let data = await handleApiCall<ProjectSchema>(controller, method, params);

			if (Array.isArray(data)) data = data[0];

			return caseConverter(data, "camel") as ProjectSchema;
		},
		getUsers: async (usersForSingleProjectRequestObject: GetUserSingleProjectRequestObject) => {
			if (!usersForSingleProjectRequestObject.id)
				throw new Error("Project ID must be there!");

			const requestObject = caseConverter(usersForSingleProjectRequestObject, "snake");
			const { method, params } = prepareUsersInSingleProjectQueryURL(requestObject);

			const data = await handleApiCall<User[]>(controller, method, params);

			return caseConverter(data, "camel") as User[];
		},
		getGroups: async (
			groupsForSingleProjectRequestObject: GetGroupSingleProjectRequestObject
		) => {
			if (!groupsForSingleProjectRequestObject.id)
				throw new Error("Project ID must be there!");

			const requestObject = caseConverter(groupsForSingleProjectRequestObject, "snake");
			const { method, params } = prepareGroupsInSingleProjectQueryURL(requestObject);

			const data = await handleApiCall<GroupSchema[]>(controller, method, params);

			return caseConverter(data, "camel") as GroupSchema[];
		},
		getForks: async (forksForSingleProjectRequestObject: GetForkSingleProjectRequestObject) => {
			if (!forksForSingleProjectRequestObject.id)
				throw new Error("Project ID must be there!");

			const requestObject = caseConverter(forksForSingleProjectRequestObject, "snake");
			const { method, params } = prepareForksInSingleProjectQueryURL(requestObject);

			const data = await handleApiCall<ProjectSchema[]>(controller, method, params);

			return caseConverter(data, "camel") as ProjectSchema[];
		},
		fork: async (forkProjectRequestObject: PostForkProjectRequestObject) => {
			if (!forkProjectRequestObject.id) throw new Error("Project ID must be there!");

			const requestObject = caseConverter(forkProjectRequestObject, "snake");
			const { method, params, formData } = prepareForkProjectPostURL(requestObject);

			let data = await handleApiCall<ProjectSchema>(controller, method, params, formData);

			if (Array.isArray(data)) data = data[0];

			return caseConverter(data, "camel") as ProjectSchema;
		},
		getLabel: async (
			singleLabelProjectRequestObject: GetSingleLabelSingleProjectRequestObject
		) => {
			if (!(singleLabelProjectRequestObject.id && singleLabelProjectRequestObject.labelId))
				throw new Error("Project ID & Label ID must be there!");

			const requestObject = caseConverter(singleLabelProjectRequestObject, "snake");
			const { method, params } = prepareLabelInSingleProjectQueryURL(requestObject);

			let data = await handleApiCall<LabelSchema>(controller, method, params);

			if (Array.isArray(data)) data = data[0];

			return caseConverter(data, "camel") as LabelSchema;
		},
		getLabels: async (labelProjectRequestObject: GetLabelSingleProjectRequestObject) => {
			if (!labelProjectRequestObject.id) throw new Error("Project ID must be there!");

			const requestObject = caseConverter(labelProjectRequestObject, "snake");
			const { method, params } = prepareLabelsInSingleProjectQueryURL(requestObject);

			const data = await handleApiCall<LabelSchema[]>(controller, method, params);

			return caseConverter(data, "camel") as LabelSchema[];
		},
		createLabel: async (labelRequestObject: Label) => {
			if (!labelRequestObject.id) throw new Error("Project ID must be there!");

			const requestObject = caseConverter(labelRequestObject, "snake");
			const { method, params, formData } = prepareLabelProjectPostURL(requestObject);

			let data = await handleApiCall<LabelSchema>(controller, method, params, formData);

			if (Array.isArray(data)) data = data[0];

			return caseConverter(data, "camel") as LabelSchema;
		},
		deleteLabel: async (deleteLabelRequestObject: SingleLabelSingleProjectRequestObject) => {
			if (!(deleteLabelRequestObject.id && deleteLabelRequestObject.labelId))
				throw new Error("Project ID & Label ID must be there!");

			const requestObject = caseConverter(deleteLabelRequestObject, "snake");
			const { method, params, formData } = prepareLabelProjectDeleteURL(requestObject);

			let data = await handleApiCall<LabelSchema>(controller, method, params, formData);

			if (Array.isArray(data)) data = data[0];

			return caseConverter(data, "camel") as LabelSchema;
		}
	};
};

export default Projects;
