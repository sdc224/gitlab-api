import { AuthenticationKey } from "./authenticationKeys";

const getAuthenticationKey = (tokenType: AuthenticationToken): string => {
	// TODO Enum switcher
	switch (tokenType) {
		case "OAuth2":
			return AuthenticationKey.OAuth2;

		case "PersonalAccess":
		case "ProjectAccess":
			return AuthenticationKey.PersonalAccess;

		default:
			return AuthenticationKey.PersonalAccess;
	}
};

const Authentication = (tokenType: AuthenticationToken, tokenValue: string): IAuthentication => {
	const tokenKey = getAuthenticationKey(tokenType);
	const authenticationObject: IAuthenticationObject = {
		tokenType,
		tokenKey,
		tokenValue
	};

	const header = { [authenticationObject.tokenKey]: authenticationObject.tokenValue };

	return {
		getTokenType: () => authenticationObject.tokenType,
		getHeader: () => header,
		setTokenType: (tokenType: AuthenticationToken) =>
			(authenticationObject.tokenType = tokenType),
		setTokenValue: (tokenValue: string) => (authenticationObject.tokenValue = tokenValue)
	};
};

export default Authentication;
