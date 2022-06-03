import { Component, OnInit } from "@angular/core";
import { FindUsernameById } from "app/services/find-username-by-id.service";
import { Article } from "app/shared/models/article.model";
import { ToastComponent } from "app/shared/toast/toast.component";
import { ArticleService } from "../../services/article.service";

@Component({
	selector: "app-article-list",
	templateUrl: "./article-list.component.html",
	styleUrls: ["./article-list.component.scss"],
})
export class ArticleListComponent implements OnInit {
	article = new Article();
	articles: Article[] = [];
	authorUsername?: string;

	constructor(
		private articleService: ArticleService,
		private findByIdService: FindUsernameById,
		public toast: ToastComponent,
	) {}

	ngOnInit(): void {
		this.articleService.getArticles().subscribe({
			next: (articles) => (this.articles = articles),
			error: (_error) =>
				this.toast.setMessage("Error fetching articles", "danger"),
		});
	}

	findUsername(id: number): string | undefined {
		return this.findByIdService.getUsername(id);
	}
}
