type GitlabConstructor = {
	token: string;
	tokenType?: AuthenticationToken;
	host?: string;
	version?: string;
	timeout?: number;
};

type IGitlab = {
	Projects: IProjects;
};
