import type { Entity } from "./Common";

export type Group = {
	groupId: number;
	groupName?: string;
	groupFullPath?: string;
	groupAccessLevel?: number;
};

export type GroupSchema = Entity & {
	fullName?: string;
	fullPath?: string;
};
