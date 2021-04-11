export type AuthenticationToken =
	| "OAuth2"
	| "PersonalAccess"
	| "ProjectAccess"
	| "SessionCookie"
	| "CIorCDJob";

export type IAuthenticationObject = {
	tokenType: AuthenticationToken;
	tokenKey: string;
	tokenValue: string;
};

export type IAuthentication = {
	readonly getTokenType: () => AuthenticationToken;
	readonly getHeader: () => Record<string, string>;
	readonly setTokenType: (_: AuthenticationToken) => void;
	readonly setTokenValue: (_: string) => void;
};
