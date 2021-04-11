import type { IEndpoints } from "../@types";

const endpoints: IEndpoints = {
	projects: {
		method: "get",
		path: "/projects"
	},
	users: {
		method: "get",
		path: "/users"
	}
};

export default endpoints;
