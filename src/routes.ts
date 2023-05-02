import { Router } from "express";
import user from "./routes/user/user.routes";
import user_skill from "./routes/skills/user_skill.routes";

class Routes {

	public routes: Array<Router> = [];

	constructor() {
		this.init();
	}

	init() {
		this.routes.push(user);
		this.routes.push(user_skill);
	}

}

export = new Routes().routes;