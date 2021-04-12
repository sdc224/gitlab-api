export type ID = {
	/**
	 * The ID or URL-encoded path of the project.
	 */
	id: number | string;
};

export type Search = {
	/**
	 * Search for specific users.
	 */
	search?: string;
};

export type Sort = {
	/**
	 * Return sorted in asc or desc order. Default is desc.
	 */
	sort?: "asc" | "desc";
};

export type Entity = ID & {
	name?: string;
};

export type EntityWithURL = Entity & {
	avatarUrl?: string;
	webUrl?: string;
};

export type IncludeStatistics = {
	/**
	 * Include project statistics.
	 */
	statistics?: boolean;
};

export type Visibility = {
	/**
	 * Limit by visibility public, internal, or private.
	 */
	visibility?: "public" | "internal" | "private";
};
