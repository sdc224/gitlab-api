import type { IEndpoints } from "../@types";

const endpoints: IEndpoints = {
	projects: {
		method: "get",
		path: "/projects",
		options: {
			deleteOnDeletion: true,
			postOnCreation: true,
			otherEndpoints: {
				forks: {
					method: "get",
					path: "/forks"
				},
				fork: {
					method: "post",
					path: "/fork"
				},
				labels: {
					method: "get",
					path: "/labels"
				}
			}
		}
	},
	mergeRequests: {
		method: "get",
		path: "/merge_requests"
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
