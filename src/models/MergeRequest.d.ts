import type { Sort, Search } from "./Common";
import type { User } from "./User";

export type GetMergeRequestReqObject = Sort &
	Search & {
		/**
		 * Return all merge requests or just those that are opened, closed, locked, or merged.
		 */
		state?: "opened" | "closed" | "locked" | "merged";
		/**
		 * Return requests ordered by created_at or updated_at fields. Default is created_at.
		 */
		orderBy?: "created_at" | "updated_at";
		/**
		 * Return merge requests for a specific milestone. None returns merge requests with no milestone.
		 * Any returns merge requests that have an assigned milestone.
		 */
		milestone?: string;
		/**
		 * If simple, returns the iid, URL, title, description, and basic state of merge request.
		 */
		view?: string;
		/**
		 * Return merge requests matching a comma separated list of labels.
		 * None lists all merge requests with no labels.
		 * Any lists all merge requests with at least one label.
		 * No+Label (Deprecated) lists all merge requests with no labels.
		 * Predefined names are case-insensitive.
		 */
		labels?: string;
		/**
		 * If true, response returns more details
		 * for each label in labels field: :name, :color, :description, :description_html, :text_color.
		 * Default is false.
		 */
		withLabelsDetails?: boolean;
		/**
		 * If true, this projection requests (but does not guarantee)
		 * that the merge_status field be recalculated asynchronously. Default is false.
		 */
		withMergeStatusRecheck?: boolean;
		/**
		 * Return merge requests created on or after the given time.
		 * Expected in ISO 8601 format (2019-03-15T08:00:00Z)
		 */
		createdAfter?: string;
		/**
		 * Return merge requests created on or before the given time.
		 * Expected in ISO 8601 format (2019-03-15T08:00:00Z)
		 */
		createdBefore?: string;
		/**
		 * Return merge requests updated on or after the given time.
		 * Expected in ISO 8601 format (2019-03-15T08:00:00Z)
		 */
		updatedAfter?: string;
		/**
		 * Return merge requests updated on or before the given time.
		 * Expected in ISO 8601 format (2019-03-15T08:00:00Z)
		 */
		updatedBefore?: string;
		/**
		 * Return merge requests for the given scope: created_by_me, assigned_to_me or all.
		 * Defaults to created_by_me
		 * For versions before 11.0, use the now deprecated created-by-me or assigned-to-me scopes instead.
		 */
		scope?: "created_by_me" | "assigned_to_me" | "all";
		/**
		 * Returns merge requests created by the given user id.
		 * Mutually exclusive with author_username.
		 * Combine with scope=all or scope=assigned_to_me.
		 */
		authorId?: number;
		/**
		 * Returns merge requests created by the given username. Mutually exclusive with authorId.
		 */
		authorUsername?: string;
		/**
		 * Returns merge requests assigned to the given user id.
		 * None returns unassigned merge requests.
		 * Any returns merge requests with an assignee.
		 */
		assigneeId?: number;
		/**
		 * Returns merge requests which have specified all the users with the given ids as individual approvers.
		 * None returns merge requests without approvers.
		 * Any returns merge requests with an approver.
		 */
		approverIds?: number[];
		/**
		 * Returns merge requests which have been approved by all the users with the given ids (Max: 5).
		 * None returns merge requests with no approvals.
		 * Any returns merge requests with an approval.
		 */
		approvedByIds?: number[];
		/**
		 * Returns merge requests which have the user as a reviewer with the given user id.
		 * None returns merge requests with no reviewers.
		 * Any returns merge requests with any reviewer. Mutually exclusive with reviewer_username.
		 */
		reviewerId?: number;
		/**
		 * Returns merge requests which have the user as a reviewer with the given username.
		 * None returns merge requests with no reviewers.
		 * Any returns merge requests with any reviewer.
		 * Mutually exclusive with reviewerId.
		 */
		reviewerUsername?: string;
		/**
		 * Return merge requests reacted by the authenticated user by the given emoji.
		 * None returns issues not given a reaction.
		 * Any returns issues given at least one reaction.
		 */
		myReactionEmoji?: string;
		/**
		 * Return merge requests with the given source branch.
		 */
		sourceBranch?: string;
		/**
		 * Return merge requests with the given target branch.
		 */
		targetBranch?: string;
		/**
		 * Modify the scope of the search attribute.
		 * title, description, or a string joining them with comma.
		 * Default is title,description.
		 */
		in?: "title,description" | "title" | "description";
		/**
		 * Filter merge requests against their wip status.
		 * yes to return only draft merge requests,
		 * no to return non-draft merge requests.
		 */
		wip?: "yes" | "no";
		/**
		 * Need Hash
		 * Return merge requests that do not match the parameters supplied.
		 * Accepts: labels, milestone, author_id, author_username, assignee_id, assignee_username, reviewer_id, reviewer_username, my_reaction_emoji.
		 */
		not?: string;
		/**
		 * Returns merge requests deployed to the given environment.
		 * Expected in ISO 8601 format (2019-03-15T08:00:00Z)
		 */
		environment?: string;
		/**
		 * Return merge requests deployed before the given date/time.
		 * Expected in ISO 8601 format (2019-03-15T08:00:00Z)
		 */
		deployedBefore?: string;
		/**
		 * Return merge requests deployed after the given date/time.
		 * Expected in ISO 8601 format (2019-03-15T08:00:00Z)
		 */
		deployedAfter?: string;
	};

export type References = {
	short: string;
	relative: string;
	full: string;
};

export type TimeStats = {
	timeEstimate: number;
	totalTimeSpent: number;
	humanTimeEstimate?: null;
	humanTotalTimeSpent?: null;
};
export interface TaskCompletionStatus {
	count: number;
	completedCount: number;
}

export type MergeRequestSchema = {
	id: number;
	iid: number;
	projectId: number;
	title: string;
	description: string;
	state: string;
	mergedBy: User;
	mergedAt: string;
	closedBy?: null;
	closedAt?: null;
	createdAt: string;
	updatedAt: string;
	targetBranch: string;
	sourceBranch: string;
	upvotes: number;
	downvotes: number;
	author: User;
	assignee: User;
	assignees?: User[] | null;
	reviewers?: User[] | null;
	sourceProjectId: number;
	targetProjectId: number;
	labels?: string[] | null;
	workInProgress: boolean;
	milestone: Milestone;
	mergeWhenPipelineSucceeds: boolean;
	mergeStatus: string;
	sha: string;
	mergeCommitSha?: null;
	squashCommitSha?: null;
	userNotesCount: number;
	discussionLocked?: null;
	shouldRemoveSourceBranch: boolean;
	forceRemoveSourceBranch: boolean;
	allowCollaboration: boolean;
	allowMaintainerToPush: boolean;
	webUrl: string;
	references: References;
	timeStats: TimeStats;
	squash: boolean;
	taskCompletionStatus: TaskCompletionStatus;
};

export type IMergeRequests = {
	readonly all: (_?: GetMergeRequestReqObject) => Promise<MergeRequestSchema[]>;
};
