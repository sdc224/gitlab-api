import type { AuthenticationToken } from "./authentication";
import type { IProjects } from "../models";
import type { IMergeRequests } from "../models/MergeRequest";

export type GitlabConstructor = {
	token: string;
	tokenType?: AuthenticationToken;
	host?: string;
	version?: string;
	timeout?: number;
};

export type IGitlab = {
	Projects: IProjects;
	MergeRequests: IMergeRequests;
};
