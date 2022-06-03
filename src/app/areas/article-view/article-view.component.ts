import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastComponent } from "app/shared/toast/toast.component";
import { ArticleService } from "app/services/article.service";
import { Article } from "app/shared/models/article.model";
import { Location } from "@angular/common";
import { UserService } from "app/services/user.service";
import { first } from "rxjs/operators";
import { FindUsernameById } from "app/services/find-username-by-id.service";
import { AuthService } from "app/services/auth.service";
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
} from "@angular/forms";

@Component({
	selector: "app-article-view",
	templateUrl: "./article-view.component.html",
	styleUrls: ["./article-view.component.scss"],
})
export class ViewArticleComponent {
	article = new Article();
	authorUsername?: string;
	articleEditionForm: FormGroup;
	titre = new FormControl("", [
		Validators.required,
		Validators.maxLength(100),
	]);
	contenu = new FormControl("", [
		Validators.required,
		Validators.maxLength(240),
	]);
	id = 0;
	editMode = false;

	constructor(
		private route: ActivatedRoute,
		private articleService: ArticleService,
		private findByIdService: FindUsernameById,
		private userService: UserService,
		private auth: AuthService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent,
		private router: Router,

		private location: Location,
	) {
		this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.getArticle(this.id);
		});

		this.articleEditionForm = this.formBuilder.group({
			titre: this.titre,
			contenu: this.contenu,
		});
	}

	getArticle(id: number): void {
		this.articleService.getArticle(id).subscribe({
			next: (article) => {
				this.article = article;
				this.getAuthorUserNameById(this.article.id);
			},
			error: (_error) =>
				this.toast.setMessage("Error fetching articles", "danger"),
		});
	}

	findUsername(id: number): string | undefined {
		return this.findByIdService.getUsername(id);
	}

	getAuthorUserNameById(authorId?: number): void {
		if (authorId)
			this.userService
				.getUser(authorId)
				.pipe(first())
				.subscribe({
					next: (user) => (this.authorUsername = user.pseudo),
					error: (_error) =>
						this.toast.setMessage(
							"Error fetching articles",
							"danger",
						),
				});
	}

	isCurrentUser(id?: number): boolean {
		const token = localStorage.getItem("token");
		if (token) {
			return id === this.auth.decodeIdFromToken(token);
		}
		return false;
	}

	editArticle(article: Article): void {
		this.titre.setValue(article.titre);
		this.contenu.setValue(article.contenu);
		this.editMode = true;
	}

	setClassTitre(): object {
		return { "is-invalid": !this.titre.pristine && !this.titre.valid };
	}

	setClassContenu(): object {
		return { "is-invalid": !this.contenu.pristine && !this.contenu.valid };
	}

	submitEditArticle(): void {
		this.articleService
			.editArticle(this.articleEditionForm.value, this.id)
			.subscribe({
				next: (_res) => {
					this.toast.setMessage(
						"You successfully edited the article!",
						"success",
					);
					location.reload();
				},
				error: (_error) =>
					this.toast.setMessage(
						"The article can't be edited",
						"danger",
					),
			});
	}

	deleteArticle(): void {
		const deletePrompt = confirm("Do you want to delete your article?");
		if (deletePrompt) {
			this.articleService.deleteArticle(this.id).subscribe({
				next: (_res) => {
					this.toast.setMessage(
						"You successfully deleted your article!",
						"success",
					);
					this.router.navigate(["/"]);
				},
				error: (_error) =>
					this.toast.setMessage(
						"Error, you can't delete your article!",
						"danger",
					),
			});
		}
	}
	back(): void {
		this.location.back();
	}
}
