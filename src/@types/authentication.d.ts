type AuthenticationToken =
	| "OAuth2"
	| "PersonalAccess"
	| "ProjectAccess"
	| "SessionCookie"
	| "CIorCDJob";

type IAuthenticationObject = {
	tokenType: AuthenticationToken;
	tokenKey: string;
	tokenValue: string;
};

type IAuthentication = {
	readonly getTokenType: () => AuthenticationToken;
	readonly getHeader: () => Record<string, string>;
	readonly setTokenType: (_: AuthenticationToken) => void;
	readonly setTokenValue: (_: string) => void;
};
