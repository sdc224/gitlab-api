import type { EntityWithURL } from "./Common";

export type Group = {
	groupId: number;
	groupName?: string;
	groupFullPath?: string;
	groupAccessLevel?: number;
};

export type GroupSchema = EntityWithURL & {
	fullName?: string;
	fullPath?: string;
};
