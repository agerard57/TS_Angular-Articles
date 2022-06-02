import { Component, OnInit } from "@angular/core";
import { User } from "app/shared/models/user.model";
import { Comment } from "app/shared/models/comment.model";
import { CommentService } from "app/services/comment.service";
import { ActivatedRoute } from "@angular/router";
import { ToastComponent } from "app/shared/toast/toast.component";
import { ArticleService } from "app/services/article.service";
import { Article } from "app/shared/models/article.model";
import { Location } from '@angular/common'

@Component({
	selector: "app-article-view",
	templateUrl: "./article-view.component.html",
	styleUrls: ["./article-view.component.scss"],
})
export class ViewArticleComponent implements OnInit {
	user = new User();
	article = new Article();
	comment = new Comment();
	comments: Comment[] = [];
	id = "1";

	constructor(
		private route: ActivatedRoute,
		private articleService: ArticleService,
		private commentService: CommentService,
		public toast: ToastComponent,private location: Location
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.getArticle(params["id"]);
			this.getComments(params["id"]);
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

	getArticle(id : number): void {
		this.articleService.getArticle(id).subscribe({
			next: (article) => (this.article = article),
			error: (_error) =>
				this.toast.setMessage("Error fetching articles", "danger"),
		});
	}

	back(): void {
		this.location.back()
	  }
}
