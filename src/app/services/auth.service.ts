import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "./user.service";
import { ToastComponent } from "../shared/toast/toast.component";
import { User } from "../shared/models/user.model";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
	loggedIn = false;
	expirationDate: any;
	currentUser: User = new User();

	constructor(
		private userService: UserService,
		private jwtHelper: JwtHelperService,
		private router: Router,
		public toast: ToastComponent,

	) {
		const token = localStorage.getItem("token");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			const decodedId = this.decodeIdFromToken(token);
			this.setCurrentUser(decodedId);
		} else if (!token) this.logout();
	}
    ngAfterViewInit() {
		//Copy in all the js code from the script.js. Typescript will complain but it works just fine
	 }
	 
	login(emailAndPassword: object): void {
		this.userService.login(emailAndPassword).subscribe({
			next: (res) => {
				console.log(res);
				localStorage.setItem("token", res.token);
				const decodedId = this.decodeIdFromToken(res.token);
				this.setCurrentUser(decodedId);
				this.loggedIn = true;
				this.toast.setMessage("Invalid email or password!", "danger");
				this.router.navigate(["/"]);
			},
			error: (_error) =>
				this.toast.setMessage("Invalid email or password!", "danger"),
		});
	}

	logout(): void {
		localStorage.removeItem("token");
		this.loggedIn = false;
		this.currentUser = new User();
		this.router.navigate(["/"]);
	}

	decodeIdFromToken(token: string): number {
		return this.jwtHelper.decodeToken(token).id;
	}

	getTokenExpirationDate(token: string) {
		this.expirationDate = this.jwtHelper.getTokenExpirationDate(token);
	}

	setCurrentUser(userId: any): void {
		this.loggedIn = true;
		this.userService.getUser(userId).subscribe({
			next: (user: User) => {
				this.currentUser = user;
				console.log(user, this.currentUser);
			},
			error: (_error: any) =>
				this.toast.setMessage("Error fetching users", "danger"),
		});
	}
}
