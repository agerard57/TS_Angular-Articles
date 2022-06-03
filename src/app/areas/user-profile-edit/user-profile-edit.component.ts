import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
} from "@angular/forms";
import { UserService } from "app/services/user.service";
import { User } from "app/shared/models/user.model";
import { ToastComponent } from "app/shared/toast/toast.component";

@Component({
	selector: "app-user-profile-edit",
	templateUrl: "./user-profile-edit.component.html",
	styleUrls: ["./user-profile-edit.component.scss"],
})
export class UserProfileEditComponent {
	@Input() userPseudo: User["pseudo"];
	@Input() userEmail: User["email"];
	@Input() userAvatar: User["avatar"];

	@Output() toggle = new EventEmitter<boolean>();

	user = new User();
	editMode: boolean = true;
	editProfileForm: FormGroup;
	pseudo = new FormControl("", [
		Validators.required,
		Validators.minLength(2),
		Validators.maxLength(30),
		Validators.pattern("[a-zA-Z0-9_-\\s]*"),
	]);
	email = new FormControl("", [
		Validators.email,
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(100),
	]);
	password = new FormControl("", [
		Validators.required,
		Validators.minLength(6),
	]);
	avatar = new FormControl("", [
		Validators.required,
		Validators.minLength(6),
	]);

	constructor(
		private userService: UserService,
		public toast: ToastComponent,
		private formBuilder: FormBuilder,
	) {
		this.pseudo.setValue(this.userPseudo);
		this.email.setValue(this.userEmail);

		this.editProfileForm = this.formBuilder.group({
			pseudo: this.pseudo,
			email: this.email,
			password: this.password,
			avatar: this.avatar,
		});
	}

	setClassPseudo(): object {
		return {
			"is-invalid": !this.pseudo.pristine && !this.pseudo.valid,
		};
	}

	setClassEmail(): object {
		return { "is-invalid": !this.email.pristine && !this.email.valid };
	}

	setClassPassword(): object {
		return {
			"is-invalid": !this.password.pristine && !this.password.valid,
		};
	}

	setClassAvatarUrl(): object {
		return {
			"is-invalid": !this.avatar.pristine && !this.avatar.valid,
		};
	}

	editModeToggle(): void {
		this.editMode = !this.editMode;
		this.toggle.emit(this.editMode);
	}

	editProfile(): void {
		this.userService.editUser(this.editProfileForm.value).subscribe({
			next: (_res) => {
				this.toast.setMessage(
					"You successfully edited your profile!",
					"success",
				);
				location.reload();
			},
			error: (_error) =>
				this.toast.setMessage(
					"You don't have the authorization to edit this",
					"danger",
				),
		});
	}
}
