import type { Entity, ID } from "./Common";

export type Label = Entity & {
	/**
	 * The color of the label given in 6-digit hex notation with leading '#' sign
	 * (e.g. #FFAABB) or one of the CSS color names
	 */
	color: string;
	/**
	 * The description of the label
	 */
	description?: string;
	/**
	 * The priority of the label. Must be greater or equal than zero or null to remove the priority.
	 */
	priority?: number | null;
};

export type LabelSchema = Label & {
	textColor?: string;
	descriptionHtml?: string;
	openIssuesCount: number;
	closedIssuesCount: number;
	openMergeRequestsCount: number;
	subscribed?: boolean;
	isProjectLabel: boolean;
};

export type LabelAncestor = {
	/**
	 * Include ancestor groups. Defaults to true.
	 */
	includeAncestorGroups?: boolean;
};

export type SingleLabelSingleProjectRequestObject = ID & {
	/**
	 * The ID or title of a project’s label.
	 */
	labelId: number | string;
};

export type GetSingleLabelSingleProjectRequestObject = SingleLabelSingleProjectRequestObject &
	LabelAncestor;

export type GetLabelSingleProjectRequestObject = ID &
	Search &
	LabelAncestor & {
		/**
		 * Whether or not to include issue and merge request counts. Defaults to false
		 */
		withCounts?: boolean;
	};
