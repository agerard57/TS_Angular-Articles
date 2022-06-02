import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Article } from "../shared/models/article.model";

@Injectable()
export class ArticleService {
	urlBase = "https://reseau.jdedev.fr/api/article"; //CLEAN THIS IN ENV

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private http: HttpClient) {}

	addArticle(article: Article): Observable<Article> {
		return this.http.post<Article>(this.urlBase, article);
	}

	getArticle(article: Article): Observable<Article> {
		return this.http.get<Article>(`${this.urlBase}/${article._article_id}`); //DON'T LET IN PUBLIC IF ID IS PRIVATE
	}

	getArticles(): Observable<Article[]> {
		return this.http.get<Article[]>(this.urlBase);
	}

	getCommentByArticle(article: Article): Observable<Article> {
		return this.http.get<Article>(
			`${this.urlBase}/${article._article_id}/comment`,
		); //DON'T LET IN PUBLIC IF ID IS PRIVATE
	}

	editArticle(article: Article): Observable<any> {
		return this.http.put(
			`${this.urlBase}/${article._article_id}`,
			article,
			{
				responseType: "text",
			},
		);
	}

	deleteArticle(article: Article): Observable<any> {
		return this.http.delete(`${this.urlBase}/${article._article_id}`, {
			responseType: "text",
		});
	}
}
