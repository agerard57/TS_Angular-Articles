import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
	selector: "app-restricted",
	templateUrl: "./restricted.component.html",
	styleUrls: ["./restricted.component.scss"],
})
export class RestrictedComponent implements OnInit {
	constructor(
		private location: Location,
		private jwtHelper: JwtHelperService,
	) {}
	ngOnInit(): void {
		const token = localStorage.getItem("token");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			this.back();
		}
	}

	back(): void {
		this.location.back();
	}
}
