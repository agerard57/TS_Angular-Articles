import { Component, OnInit } from "@angular/core";
import { User } from "app/shared/models/user.model";
import { ToastComponent } from "app/shared/toast/toast.component";
import { UserService } from "../../services/user.service";

@Component({
	selector: "app-user-list",
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
	user = new User();
	users: User[] = [];

	constructor(
		private userService: UserService,
		public toast: ToastComponent,
	) {}

	ngOnInit(): void {
		this.getUsers();
	}
	getUsers(): void {
		this.userService.getUsers().subscribe({
			next: (users) => (this.users = users),
			error: (_error) =>
				this.toast.setMessage("Error fetching users", "danger"),
		});
	}

	onImgError(event: { target: { src: string } }) {
		event.target.src =
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
	}
}
