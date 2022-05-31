import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class AppInfoService {
	title = "Angular articles";
	version = "1.0.0";
	environment = environment.production ? "prod" : "dev";
	isDebug = environment.debug;
}
