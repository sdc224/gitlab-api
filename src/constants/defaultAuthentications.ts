import { AuthenticationKey } from "../authentication/authenticationKeys";
import type { IAuthenticationObject } from "../@types";

const defaultAuthentication: IAuthenticationObject = {
	tokenType: "PersonalAccess",
	tokenKey: AuthenticationKey.PersonalAccess,
	tokenValue: "abcdef"
};

export default defaultAuthentication;
