export type IProjectSchema = {
	id: number;
	description?: null;
	defaultBranch: string;
	visibility: string;
	sshUrlToRepo: string;
	httpUrlToRepo: string;
	webUrl: string;
	readmeUrl: string;
	tagList?: string[] | null;
	owner?: Owner;
	name: string;
	nameWithNamespace: string;
	path: string;
	pathWithNamespace: string;
	issuesEnabled?: boolean;
	openIssuesCount?: number;
	mergeRequestsEnabled?: boolean;
	jobsEnabled?: boolean;
	wikiEnabled?: boolean;
	snippetsEnabled?: boolean;
	canCreateMergeRequestIn?: boolean;
	resolveOutdatedDiffDiscussions?: boolean;
	containerRegistryEnabled?: boolean;
	createdAt: string;
	lastActivityAt: string;
	creatorId?: number;
	namespace?: Namespace;
	importStatus?: string;
	archived?: boolean;
	avatarUrl: string;
	sharedRunnersEnabled?: boolean;
	forksCount: number;
	starCount: number;
	runnersToken?: string;
	ciDefaultGitDepth?: number;
	ciForwardDeploymentEnabled?: boolean;
	publicJobs?: boolean;
	sharedWithGroups?: null[] | null;
	onlyAllowMergeIfPipelineSucceeds?: boolean;
	allowMergeOnSkippedPipeline?: boolean;
	restrictUserDefinedVariables?: boolean;
	onlyAllowMergeIfAllDiscussionsAreResolved?: boolean;
	removeSourceBranchAfterMerge?: boolean;
	requestAccessEnabled?: boolean;
	mergeMethod?: string;
	autocloseReferencedIssues?: boolean;
	suggestionCommitMessage?: null;
	markedForDeletionAt?: string;
	markedForDeletionOn?: string;
	statistics?: Statistics;
	containerRegistryImagePrefix?: string;
	_links?: Links;
	// Users of GitLab Premium or higher can see the approvals_before_merge parameter:
	approvalsBeforeMerge?: number;
};

export type GetProjectRequestObject = {
	archived?: boolean;
	idAfter?: number;
	idBefore?: number;
	/* Limit results to projects with last_activity after specified time.
	 * Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ */
	lastActivityAfter?: string;
	/* Limit results to projects with last_activity before specified time.
	 * Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ */
	lastActivityBefore?: string;
	membership?: boolean;
	// TODO : Access Level interface
	minAccessLevel?: number;
	orderBy?: string;
	owned?: boolean;
	repositoryChecksumFailed?: boolean;
	repositoryStorage?: string;
	searchNamespaces?: boolean;
	search?: string;
	simple?: boolean;
	sort?: string;
	starred?: boolean;
	statistics?: boolean;
	visibility?: string;
	wikiChecksumFailed?: boolean;
	withCustomAttributes?: boolean;
	withIssuesEnabled?: boolean;
	withMergeRequestEnabled?: boolean;
	withProgrammingLanguage?: string;
};

export type GetUserProjectRequestObject = GetProjectRequestObject & { userId: string };

export type IProjects = {
	readonly all: (_?: GetProjectRequestObject) => Promise<IProjectSchema[]>;
	readonly user: (_: GetUserProjectRequestObject) => Promise<IProjectSchema[]>;
	readonly starredByUser: (_: GetUserProjectRequestObject) => Promise<IProjectSchema[]>;
};
