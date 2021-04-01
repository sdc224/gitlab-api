import defaultConfig from "./defaultConfigs";
import defaultAuthentication from "./defaultAuthentications";

const handleDefaultParams = (
	constrObj: GitlabConstructor
): { configObject: IConfigObject; authenticationObject: IAuthenticationObject } => {
	const configObject = defaultConfig;
	const authenticationObject = defaultAuthentication;

	// TODO Custom Error Handler
	if (!constrObj) throw new Error("You have to pass API Token atleast to get this running");

	authenticationObject.tokenValue = constrObj.token;

	if (constrObj.host) configObject.host = constrObj.host;
	if (constrObj.version) configObject.apiVersion = constrObj.version;
	if (constrObj.timeout) configObject.timeout = constrObj.timeout;

	if (constrObj.tokenType) authenticationObject.tokenType = constrObj.tokenType;

	return { configObject, authenticationObject };
};

export default handleDefaultParams;
