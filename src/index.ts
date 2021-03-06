import Config from "./configs";
import handleDefaultParams from "./constants";
import Authentication from "./authentication";
import Controller from "./controllers";
import ProjectsBundle from "./logic/Projects";
import MergeRequestsBundle from "./logic/MergeRequests";
import type { GitlabConstructor, IGitlab } from "./@types";

const Gitlab = (constructorObject: GitlabConstructor): IGitlab => {
	const { configObject, authenticationObject } = handleDefaultParams(constructorObject);

	const config = Config(
		configObject.host,
		configObject.apiVersion,
		configObject.timeout,
		configObject.apiUrl,
		configObject.endpoints
	);
	const authentication = Authentication(
		authenticationObject.tokenType,
		authenticationObject.tokenValue
	);

	const controller = Controller(config, authentication);
	const Projects = ProjectsBundle(config, controller);
	const MergeRequests = MergeRequestsBundle(config, controller);

	return { Projects, MergeRequests };
};

export default Gitlab;
