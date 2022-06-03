import { Injectable } from "@angular/core";

import { UserService } from "./user.service";
import { ToastComponent } from "../shared/toast/toast.component";
import { User } from "../shared/models/user.model";

@Injectable()
export class FindUsernameById {
	user = new User();
	users: User[] = [];

	constructor(
		private userService: UserService,
		public toast: ToastComponent,
	) {
		this.getUsers();
	}

	getUsers(): void {
		this.userService.getUsers().subscribe({
			next: (users) => (this.users = users),
			error: (_error) =>
				this.toast.setMessage("Error fetching users", "danger"),
		});
	}

	getUsername(id: number): string | undefined {
		const username = this.users.find((user) => user.id == id)?.pseudo;
		return username;
	}
}
