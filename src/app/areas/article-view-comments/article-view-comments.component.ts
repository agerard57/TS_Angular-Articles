import { Component } from "@angular/core";
import { CommentService } from "app/services/comment.service";
import { Comment } from "app/shared/models/comment.model";
import { ActivatedRoute } from "@angular/router";
import { ToastComponent } from "app/shared/toast/toast.component";
import { FindUsernameById } from "app/services/find-username-by-id.service";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { AuthService } from "app/services/auth.service";

@Component({
	selector: "app-article-view-comments",
	templateUrl: "./article-view-comments.component.html",
	styleUrls: ["./article-view-comments.component.scss"],
})
export class ArticleViewCommentsComponent {
	id = 1;
	commentForm: FormGroup;
	editMode = false;
	commentId = 0;
	contenu = new FormControl("", [
		Validators.required,
		Validators.maxLength(150),
	]);

	comment = new Comment();
	comments: Comment[] = [];
	constructor(
		private formBuilder: FormBuilder,
		private auth: AuthService,
		private findByIdService: FindUsernameById,
		private commentService: CommentService,
		private route: ActivatedRoute,
		public toast: ToastComponent,
	) {
		this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.getComments(this.id);
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

	findUsername(id: number): string | undefined {
		return this.findByIdService.getUsername(id);
	}

	isCurrentUser(id: number): boolean {
		const token = localStorage.getItem("token");
		if (token) {
			return id == this.auth.decodeIdFromToken(token);
		}
		return false;
	}

	setClassContenu(): object {
		return { "is-invalid": !this.contenu.pristine && !this.contenu.valid };
	}

	addOrEditComment(): void {
		!this.editMode ? this.submitAddComment() : this.submitEditComment();
	}

	submitAddComment(): void {
		this.commentService.addComment(this.commentForm.value).subscribe({
			next: (_res) => {
				this.toast.setMessage(
					"You successfully added a comment!",
					"success",
				);
				location.reload();
			},
			error: (_error) =>
				this.toast.setMessage("This comment cannot be published", "danger"),
		});
	}
	submitEditComment(): void {
		this.commentService
			.editComment(this.commentForm.value, this.commentId)
			.subscribe({
				next: (_res) => {
					this.toast.setMessage(
						"You successfully edited the comment!",
						"success",
					);
					location.reload();
				},
				error: (_error) =>
					this.toast.setMessage(
						"The comment can't be edited",
						"danger",
					),
			});
	}

	editComment(comment: Comment): void {
		if (comment.id_commentaire) {
			this.contenu.setValue(comment.contenu);
			this.commentId = comment.id_commentaire;
			this.editMode = true;
		}
	}

	leaveEditMode(): void {
		this.contenu.setValue("");
		this.editMode = false;
	}

	deleteComment(id: number): void {
		const deletePrompt = confirm("Do you want to delete your comment?");
		if (deletePrompt) {
			this.commentService.deleteComment(id).subscribe({
				next: (_res) => {
					this.toast.setMessage(
						"You successfully deleted your comment!",
						"success",
					);
					location.reload();
				},
				error: (_error) =>
					this.toast.setMessage(
						"Error, you can't delete your comment",
						"danger",
					),
			});
		}
	}
}
