import AxiosController from "./axios";
import type { IConfig, IAuthentication, IController } from "../@types";

const Controller = (config: IConfig, authentication: IAuthentication): IController => {
	// TODO : Axios only acting as a controller
	const controllerObj = AxiosController(config, authentication);
	return controllerObj;
};

export default Controller;
