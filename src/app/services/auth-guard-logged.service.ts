import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardLogged implements CanActivate {
	constructor(public auth: AuthService, private router: Router) {}

	canActivate(): boolean {
		const loggedIn = this.auth.loggedIn;

		if (!loggedIn) this.router.navigate(["/restricted"]);
		return loggedIn;
	}
}
