import { Component, OnInit } from '@angular/core';
import { Article } from "app/shared/models/article.model";
import { Comment } from "app/shared/models/comment.model";
import { ToastComponent } from 'app/shared/toast/toast.component';
import { ArticleService } from "../../services/article.service";
import { CommentService } from "../../services/comment.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  article = new Article();
  articles: Article[] = []
  comment = new Comment();
  comments: Comment[] = []

  constructor(
    private articleService: ArticleService,
    private commentService: CommentService,
		public toast: ToastComponent) { }

  ngOnInit(): void {		
    this.getArticles();
/*     this.getCommentsbyArticle(); */
  }
	getArticles(): void {
		this.articleService.getArticles().subscribe({
			next: (articles) => (this.articles = articles),
			error: (_error) =>
				this.toast.setMessage("Error fetching articles", "danger"),
		});
	}
}
