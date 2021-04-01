import { AuthenticationKey } from "../authentication/authenticationKeys";

const defaultAuthentication: IAuthenticationObject = {
	tokenType: "PersonalAccess",
	tokenKey: AuthenticationKey.PersonalAccess,
	tokenValue: "abcdef"
};

export default defaultAuthentication;
