import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "./user.service";
import { ToastComponent } from "../shared/toast/toast.component";
import { User } from "../shared/models/user.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { take, tap } from "rxjs/operators";
import { Observable } from "rxjs";

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
	) {}

	init(): void {
		const token = localStorage.getItem("token");
		if (token && !this.jwtHelper.isTokenExpired(token)) {
			const decodedId = this.decodeIdFromToken(token);
			this.setCurrentUser(decodedId).subscribe();
		} else if (!token) this.logout();
	}

	login(emailAndPassword: object): void {
		this.userService.login(emailAndPassword).subscribe({
			next: (res) => {
				localStorage.setItem("token", res.token);
				const decodedId = this.decodeIdFromToken(res.token);
				this.setCurrentUser(decodedId).subscribe((_user) => {
					this.router.navigate(["/"]);
				});
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

	setCurrentUser(userId: any): Observable<User> {
		this.loggedIn = true;
		return this.userService.getUser(userId).pipe(
			take(1),
			tap((user: User) => {
				this.currentUser = user;
			}),
		);
	}
}
