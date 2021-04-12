import type { IEndpoints } from "../@types";

const endpoints: IEndpoints = {
	projects: {
		method: "get",
		path: "/projects",
		options: {
			postOnCreation: true,
			otherPaths: { forks: "/forks" }
		}
	},
	users: {
		method: "get",
		path: "/users"
	},
	groups: {
		method: "get",
		path: "/groups"
	}
};

export default endpoints;
