import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "./user.service";
import { ToastComponent } from "../shared/toast/toast.component";
import { User } from "../shared/models/user.model";

@Injectable()
export class AuthService {
	loggedIn = false;

	currentUser: User = new User();

	constructor(
		private userService: UserService,
		private router: Router,
		public toast: ToastComponent,
	) {
		const user = localStorage.getItem("user");
		if (user) {
			this.setCurrentUser(JSON.parse(user));
		}
	}

	login(emailAndPassword: object): void {
		this.userService.login(emailAndPassword).subscribe({
			next: (res) => {
				console.log(res);
				localStorage.setItem("user", JSON.stringify(res));
				this.setCurrentUser(res);
				this.loggedIn = true;
				this.toast.setMessage("Invalid email or password!", "danger");
				this.router.navigate(["/"]);
			},
			error: (_error) =>
				this.toast.setMessage("Invalid email or password!", "danger"),
		});
	}

	logout(): void {
		localStorage.removeItem("user");
		this.loggedIn = false;
		this.currentUser = new User();
		this.router.navigate(["/"]);
	}

	setCurrentUser(user: any): void {
		this.loggedIn = true;
		this.currentUser = user;
		console.log(this.currentUser);
	}
}
