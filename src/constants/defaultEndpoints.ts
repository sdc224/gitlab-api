import type { IEndpoints } from "../@types";

const endpoints: IEndpoints = {
	projects: {
		method: "get",
		path: "/projects",
		options: {
			postOnCreation: true,
			otherEndpoints: {
				forks: {
					method: "get",
					path: "/forks"
				},
				fork: {
					method: "post",
					path: "/fork"
				}
			}
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
