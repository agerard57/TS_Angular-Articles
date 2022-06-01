import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";

import { UserService } from "../../services/user.service";
import { ToastComponent } from "../../shared/toast/toast.component";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
})
export class RegisterComponent {
	registerForm: FormGroup;
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
		private formBuilder: FormBuilder,
		private router: Router,
		public toast: ToastComponent,
		private userService: UserService,
	) {
		this.registerForm = this.formBuilder.group({
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

	register(): void {
		this.userService.register(this.registerForm.value).subscribe({
			next: (_res) => {
				this.toast.setMessage(
					"You successfully registered!",
					"success",
				);
				this.router.navigate(["/login"]);
			},
			error: (_error) =>
				this.toast.setMessage("Email already exists", "danger"),
		});
	}
}
