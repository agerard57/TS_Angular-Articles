import { Component } from "@angular/core";
import { User } from "app/shared/models/user.model";
import { Comment } from "app/shared/models/comment.model";
import { CommentService } from "app/services/comment.service";
import { ActivatedRoute } from "@angular/router";
import { ToastComponent } from "app/shared/toast/toast.component";
import { ArticleService } from "app/services/article.service";
import { Article } from "app/shared/models/article.model";
import { Location } from "@angular/common";
import { UserService } from "app/services/user.service";
import { first } from "rxjs/operators";
import { FindUsernameById } from "app/services/find-username-by-id.service";
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
export class ViewArticleComponent{
	user = new User();
	article = new Article();
	comment = new Comment();
	comments: Comment[] = [];
	id = "1";
	authorUsername?: string;
	commentForm: FormGroup;
	contenu = new FormControl("", [
		Validators.required,
		Validators.maxLength(150),
	]);

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private articleService: ArticleService,
		private commentService: CommentService,
		private findByIdService: FindUsernameById,
		private userService: UserService,
		public toast: ToastComponent,
		private location: Location,
	) {
		this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.getArticle(params["id"]);
			this.getComments(params["id"]);
		});

		this.commentForm = this.formBuilder.group({
			contenu: this.contenu,
			idArt: this.id,
		});
	}
	
	getComments(id: number): void {
		this.commentService.getComments().subscribe({
			next: (comments: Comment[]) => {
				this.comments = comments.filter(
					(comment) => comment.id_article == id,
				);
			},
			error: (_error: any) =>
				this.toast.setMessage("Error fetching comments", "danger"),
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
	// The two methods down below acts differently
	// to more or less get the same result
	// I kept them both for educationnal purposes
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

	setClassContenu(): object {
		return { "is-invalid": !this.contenu.pristine && !this.contenu.valid };
	}

	addComment(): void {
		this.commentService.addComment(this.commentForm.value).subscribe({
			next: (_res) => {
				this.toast.setMessage(
					"You successfully added a comment!",
					"success",
				);
				location.reload();
			},
			error: (_error) =>
				this.toast.setMessage("Article already exists", "danger"),
		});
	}

	back(): void {
		this.location.back();
	}
}
