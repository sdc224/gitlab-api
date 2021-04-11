export type GitlabConstructor = {
	token: string;
	tokenType?: AuthenticationToken;
	host?: string;
	version?: string;
	timeout?: number;
};

export type IGitlab = {
	Projects: IProjects;
};
