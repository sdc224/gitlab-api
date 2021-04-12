import type { Links } from "./Links";
import type { Namespace } from "./Namespace";
import type { Owner } from "./Owner";
import type { Statistics } from "./Statistics";
import type { ContainerExpirationPolicy } from "./Container";
import type { Group, GroupSchema } from "./Group";
import type { ID, Search, Sort, Entity, Visibility } from "./Common";
import type { User } from "./User";

export type Access = {
	accessLevel?: number;
	notificationLevel?: number;
};

export type Permission = {
	projectAccess?: Access;
	groupAccess?: Access;
};

export type License = {
	key: string;
	name?: string;
	nickname?: string;
	htmlUrl?: string;
	sourceUrl?: string;
};

// TODO : Combine with Common.d.ts Entity
export type ProjectSchema = {
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
	containerExpirationPolicy?: ContainerExpirationPolicy;
	createdAt: string;
	lastActivityAt: string;
	creatorId?: number;
	namespace?: Namespace;
	importStatus?: string;
	// TODO : Type below
	importError?: null;
	permissions: Permission;
	archived?: boolean;
	avatarUrl: string;
	licenseUrl?: string;
	license?: License;
	sharedRunnersEnabled?: boolean;
	forksCount: number;
	starCount: number;
	runnersToken?: string;
	ciDefaultGitDepth?: number;
	ciForwardDeploymentEnabled?: boolean;
	publicJobs?: boolean;
	sharedWithGroups?: Group[] | null;
	repositoryStorage?: string;
	onlyAllowMergeIfPipelineSucceeds?: boolean;
	allowMergeOnSkippedPipeline?: boolean;
	restrictUserDefinedVariables?: boolean;
	onlyAllowMergeIfAllDiscussionsAreResolved?: boolean;
	removeSourceBranchAfterMerge?: boolean;
	printingMergeRequestsLinkEnabled?: boolean;
	requestAccessEnabled?: boolean;
	mergeMethod?: string;
	autoDevopsEnabled?: boolean;
	autoDevopsDeployStrategy?: string;
	mirror?: boolean;
	mirrorUserId?: number;
	mirrorTriggerBuilds?: boolean;
	onlyMirrorProtectedBranches?: boolean;
	mirrorOverwritesDivergedBranches?: boolean;
	externalAuthorizationClassificationLabel?: null;
	packagesEnabled?: boolean;
	serviceDeskEnabled?: boolean;
	serviceDeskAddress?: null;
	autocloseReferencedIssues?: boolean;
	suggestionCommitMessage?: null;
	markedForDeletionAt?: string;
	markedForDeletionOn?: string;
	complianceFrameworks?: string[];
	statistics?: Statistics;
	containerRegistryImagePrefix?: string;
	_links?: Links;
	// Users of GitLab Premium or higher can see the approvals_before_merge parameter:
	approvalsBeforeMerge?: number;
	/**
	 * If the project is a fork, and you provide a valid token
	 * to authenticate, the forkedFromProject field appears in the response.
	 */
	forkedFromProject?: ProjectSchema;
};

export type GetBaseProjectRequestObject = Search &
	Sort &
	Statistics &
	Visibility & {
		/**
		 * Limit by archived status.
		 */
		archived?: boolean;
		/**
		 * Limit by projects that the current user is a member of.
		 */
		membership?: boolean;
		// TODO : Access Level interface
		/**
		 * Limit by current user minimal access level.
		 */
		minAccessLevel?: number;
		/**
		 * Return projects ordered by
		 * id, name, path, created_at, updated_at, or last_activity_at fields.
		 * Default is created_at.
		 */
		orderBy?: string;
		/**
		 * Limit by projects explicitly owned by the current user.
		 */
		owned?: boolean;
		/**
		 * Return only limited fields for each project.
		 * This is a no-op without authentication as then only simple fields are returned.
		 */
		simple?: boolean;
		/**
		 * Limit by projects starred by the current user.
		 */
		starred?: boolean;
		/**
		 * Include custom attributes in response. (admins only)
		 */
		withCustomAttributes?: boolean;
		/**
		 * Limit by enabled issues feature.
		 */
		withIssuesEnabled?: boolean;
		/**
		 * Limit by enabled merge requests feature.
		 */
		withMergeRequestEnabled?: boolean;
	};

export type GetProjectRequestObject = GetBaseProjectRequestObject & {
	idAfter?: number;
	idBefore?: number;
	/* Limit results to projects with last_activity after specified time.
	 * Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ */
	lastActivityAfter?: string;
	/* Limit results to projects with last_activity before specified time.
	 * Format: ISO 8601 YYYY-MM-DDTHH:MM:SSZ */
	lastActivityBefore?: string;

	repositoryChecksumFailed?: boolean;
	repositoryStorage?: string;
	searchNamespaces?: boolean;
	wikiChecksumFailed?: boolean;
	withProgrammingLanguage?: string;
};

export type GetUserProjectRequestObject = GetProjectRequestObject & { userId: string };

export type GetSingleProjectRequestObject = ID &
	Statistics & {
		/**
		 * Include project license data.
		 */
		license?: boolean;
		/**
		 * Include custom attributes in response. (admins only)
		 */
		withCustomAttributes?: boolean;
	};

export type GetUserSingleProjectRequestObject = ID &
	Search & {
		/**
		 * Filter out users with the specified IDs.
		 */
		skipUsers?: number[];
	};

export type GetGroupSingleProjectRequestObject = ID &
	Search & {
		/**
		 * Skip the group IDs passed.
		 */
		skipGroups?: number[];
		/**
		 * Include projects shared with this group. Default is false.
		 */
		withShared?: boolean;
		/**
		 * Limit to shared groups with at least this access level.
		 */
		sharedMinAccessLevel?: number;
	};

export type GetForkSingleProjectRequestObject = ID & GetBaseProjectRequestObject;

export type PostForkProjectRequestObject = Entity &
	Visibility & {
		/**
		 * The ID of the namespace that the project is forked to.
		 */
		namespaceId?: number;
		/**
		 * The path of the namespace that the project is forked to.
		 */
		namespacePath?: string;
		/**
		 * The path assigned to the resultant project after forking.
		 */
		path?: string;
		/**
		 * The description assigned to the resultant project after forking.
		 */
		description?: string;
	};

export type IProjects = {
	readonly all: (_?: GetProjectRequestObject) => Promise<ProjectSchema[]>;
	readonly user: (_: GetUserProjectRequestObject) => Promise<ProjectSchema[]>;
	readonly starredByUser: (_: GetUserProjectRequestObject) => Promise<ProjectSchema[]>;
	readonly get: (_: GetSingleProjectRequestObject) => Promise<ProjectSchema>;
	readonly getUsers: (_: GetUserSingleProjectRequestObject) => Promise<User[]>;
	readonly getGroups: (_: GetGroupSingleProjectRequestObject) => Promise<GroupSchema[]>;
	readonly getForks: (_: GetForkSingleProjectRequestObject) => Promise<GroupSchema[]>;
	readonly fork: (_: PostForkProjectRequestObject) => Promise<ProjectSchema>;
};
