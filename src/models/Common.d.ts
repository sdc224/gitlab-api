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

export type Entity = {
	id: number | string;
	name?: string;
	avatarUrl?: string;
	webUrl?: string;
};

export type IncludeStatistics = {
	/**
	 * Include project statistics.
	 */
	statistics?: boolean;
};
