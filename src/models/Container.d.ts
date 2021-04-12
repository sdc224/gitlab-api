export interface ContainerExpirationPolicy {
	cadence?: string;
	enabled?: boolean;
	// TODO : Types below
	keepN?: null;
	olderThan?: null;
	nameRegexDelete?: null;
	nameRegexKeep?: null;
	nextRunAt?: string;
}
