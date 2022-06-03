import { Component } from "@angular/core";
import { AuthService } from "app/services/auth.service";

import { AppInfoService } from "../../shared";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
	title = this.appInfo.title;

	constructor(public auth: AuthService, private appInfo: AppInfoService) {}
}
